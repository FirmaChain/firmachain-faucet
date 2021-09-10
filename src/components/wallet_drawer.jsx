import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Select, MenuItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'
import RefreshIcon from '@material-ui/icons/Refresh'

import { Wrapper } from "../utils/public_style"

import { useContext, useState } from "react"
import { useEffect } from "react"

import { Wallet } from "../utils/wallet"

import { useSelector } from 'react-redux';
import { WalletInfoActions } from "../redux/actions"

import copy from "copy-to-clipboard"
import { UtilsContext } from "../screen/main"

const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: '#fff',
    },

    // text field
    disabled_textfield: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '3px',
    },
    active_textfield: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '3px',
        marginBottom: '10px',
    },

    account_select: {
        backgroundColor: '#fff',
        borderRadius: '3px',
        width: '50px',
    },

    typography_text: {
        padding: '10px',
        color: '#fff',
        ['@media (max-width: 770px)']:{
            wordBreak: 'all',
        },
    },

    button: {
        backgroundColor: '#fff',
        width: '90%',
        padding: '10px',
    },
}));

export default function WalletDrawer({open, handleWalletDrawer}) {
    const { 
        handleAlertOpen,
        handleLoadingOpen } = useContext(UtilsContext);

    const classes = useStyles();
    const DrawerTitle = 'Wallet';

    const {
        sendTokenByPrivateKey,
        createNewWallet,
        getPrivateKey,
        getAddressFromPrivateKey,
        getTokenBalance,
    } = Wallet();
    
    const state = useSelector(state => state.walletInfo);

    const [nemonic, setNemonic] = useState(state.nemonic);
    const [privateKey, setPrivateKey] = useState(state.privateKey);
    const [address, setAddress] = useState(state.walletAddress);
    const [accountIndex, setAccountIndex] = useState(state.accountIndex);
    const [balance, setBalance] = useState(state.fctBalance);
    
    const [toAddressInputText, settoAddressInputText] = useState('');
    const [amountInputText, settoMountInputText] = useState('');
    const [isSendToken, setIsSendToken] = useState(false);

    const [isCreate, setIsCreate] = useState(false);

    // Account Key index 생성
    var Selectindex = [];
    for(var i =0; i <= 100; i++){
        Selectindex.push(i);
    }

    // Account Key index
    const onChangeAccountIndex = (event) => {
        setAccountIndex(event.target.value);
    }
    
    const onChangetoAddressInputText = (event) => {
        settoAddressInputText(event.target.value);
    }

    const onChangetoAmountInputText = (event) => {
        settoMountInputText(event.target.value);
    }

    const resetToAddressAndAmount = () => {
        settoAddressInputText('');
        settoMountInputText('');
    }

    const handleClipboard = (event, label) => {
        if(event.target.value === '' || event.target.value === undefined){
            return;
        }
        copy(event.target.value);
        handleAlertOpen('Coppied ' + label, 3000, 'success');
    };

    const onClickCreateWallet = () => {
        setIsCreate(true);
    }

    const closeDrawer = () => {
        handleWalletDrawer(false)
    };

    
    async function createWallet() {
        try {
            let newWallet = await createNewWallet();
            setNemonic(newWallet.mnemonic);
            let _privateKey = await getPrivateKey(newWallet.mnemonic, 0);
            setPrivateKey(_privateKey);
            let _adrFromPrivateKey = await getAddressFromPrivateKey(_privateKey);
            setAddress(_adrFromPrivateKey);
            let _balance = await getTokenBalance(_adrFromPrivateKey);
            setBalance(_balance);

            handleAlertOpen('Created your wallet', 3000, 'success');
        } catch (error) {
            console.log("[error] " + error);
            handleAlertOpen(error.message, 5000, 'error');
        }
    }
    
    async function getWalletData(idx = 0){
        try {
            let _privateKey;
            if(nemonic !== ''){
                _privateKey = await getPrivateKey(nemonic, Number(idx));
                setPrivateKey(_privateKey);
            } else {
                _privateKey = privateKey
            }
            let _adrFromPrivateKey = await getAddressFromPrivateKey(_privateKey);
            setAddress(_adrFromPrivateKey);
            
            let _balance = await getTokenBalance(_adrFromPrivateKey);
            setBalance(_balance);
            
        } catch (error) {
            console.log("[error] " + error);
            handleAlertOpen(error.message, 5000, 'error');
        }
    }

    const sendToken = async() => {
        if(toAddressInputText === '') {
            handleAlertOpen('Please fill in to address', 5000, 'error');
            return;
        }
        if(amountInputText === ''){
            handleAlertOpen('Please fill in amount', 5000, 'error');
            return;
        }

        handleLoadingOpen(true);
        try {
            let send = await sendTokenByPrivateKey(privateKey, toAddressInputText, Number(amountInputText));
            console.log(send);
            getWalletData();
            handleLoadingOpen(false);
            resetToAddressAndAmount();
            handleAlertOpen('Send token success', 3000, 'success');
        } catch (error) {
            console.log("[error] " + error);
            handleLoadingOpen(false);
            resetToAddressAndAmount();
            handleAlertOpen(error.message, 5000, 'error');
        }
    }

    const saveWalletInfoToRedux = () => {
        WalletInfoActions.setNemonic(nemonic);
        WalletInfoActions.setPrivateKey(privateKey);
        WalletInfoActions.setWalletAddress(address);
        WalletInfoActions.setAccountIndex(accountIndex);
        WalletInfoActions.setFctBalance(balance);
    }

    useEffect(() => {
        if(isSendToken){
            sendToken();
        }
    }, [isSendToken])

    useEffect(() => {
        saveWalletInfoToRedux();
    }, [nemonic, privateKey, address, accountIndex, balance])

    useEffect(() => {
        if(isCreate){
            createWallet();        
        } else {
            if(state.nemonic !== ''){
                getWalletData(Number(accountIndex));
            }
        }
        return () => {
            setIsCreate(false);
        }
    }, [isCreate, accountIndex])

    useEffect(() => {
        if(open){
            setNemonic(state.nemonic);
            setPrivateKey(state.privateKey);
            setAddress(state.walletAddress);
            setBalance(state.fctBalance);
            setAccountIndex(state.accountIndex);
        }
    }, [open])

    return (
        <>
        <Drawer anchor={'right'} open={open}>
            <ClickAwayListener onClickAway={closeDrawer}>
                <div style={{width: '335px', height: '100%', padding: '20px', backgroundColor: '#333', zIndex: '0', overflowY: 'auto'}}>
                    <Wrapper style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Wrapper style={{padding: 0, display:'flex', justifyContent: 'left', alignItems: 'center'}}>
                            <Typography
                                className={classes.typography_text}
                                variant='h5'
                            >
                                {DrawerTitle}
                            </Typography>
                            <RefreshIcon 
                                style={{color: '#fff', cursor: 'pointer'}}
                                onClick={()=>getWalletData()}
                            />
                        </Wrapper>
                        <CloseIcon 
                            style={{color: '#fff', cursor: 'pointer'}}
                            onClick={()=>closeDrawer()}
                        />
                    </Wrapper>
                    <Divider className={classes.divider}/>
                    <Wrapper>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            onClick={()=>onClickCreateWallet()}
                        >Create New Wallet</Button>
                    </Wrapper>
                    
                    <List>
                        <Typography
                        className={classes.typography_text}
                        variant='body2'
                        >
                            Nemonic
                        </Typography>
                        <ListItem>
                            <Wrapper drawer>
                                <TextField 
                                    className={classes.disabled_textfield}
                                    onClick={(e)=>handleClipboard(e, 'Nemonic')}
                                    multiline
                                    maxRows={5}
                                    variant="outlined"
                                    value={nemonic}
                                    disabled
                                />
                            </Wrapper>
                        </ListItem>
                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            Private Key
                        </Typography>
                        <ListItem>
                            <Wrapper drawer>
                                <TextField
                                    className={classes.disabled_textfield}
                                    onClick={(e)=>handleClipboard(e, 'Private Key')}
                                    variant="outlined"
                                    value={privateKey}
                                    disabled
                                />
                            </Wrapper>
                        </ListItem>

                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            Wallet Address
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                onClick={(e)=>handleClipboard(e, 'Wallet Address')}
                                variant="outlined"
                                value={address}
                                disabled
                            />
                        </ListItem>
                        
                        
                        {state.nemonic !== '' && 
                            <>
                            <ListItem>
                                <Wrapper style={{display: 'flex', justifyContent: 'right'}}>
                                    <Typography
                                        className={classes.typography_text}
                                        style={{opacity: '.8'}}
                                        variant='body2'
                                    >
                                        Select your account index
                                    </Typography>
                                    <Select
                                        className={classes.account_select}
                                        value={Number(accountIndex)}
                                        onChange={(e)=>onChangeAccountIndex(e)}
                                        MenuProps={{ disablePortal: true }}
                                    >
                                        {Selectindex.map((idx) => {
                                            return (
                                                <MenuItem value={idx} key={'select-option-'+idx}>{idx}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </Wrapper>
                            </ListItem>
                            </>
                        }

                        <Divider className={classes.divider}/>
                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            FCT Balance
                        </Typography>
                        <ListItem>
                            <Wrapper drawer>
                                <TextField 
                                    className={classes.disabled_textfield}
                                    variant="outlined"
                                    disabled
                                    value={balance+'fct'}
                                />
                            </Wrapper>
                        </ListItem>

                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            To Address
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                variant="outlined"
                                onChange={onChangetoAddressInputText}
                                value={toAddressInputText}
                            />
                        </ListItem>
                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            Amount
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                variant="outlined"
                                onChange={onChangetoAmountInputText}
                                value={amountInputText}
                            />
                        </ListItem>
                        <Wrapper>
                            <Button 
                                className={classes.button}
                                variant="contained"
                                onClick={()=>setIsSendToken(true)}
                            >Send</Button>
                        </Wrapper>
                    </List>
                </div>
            </ClickAwayListener>
        </Drawer>
        </>
    )
}
