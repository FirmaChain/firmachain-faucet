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

import { useSelector } from 'react-redux';
import { WalletInfoActions } from "../redux/actions"

import copy from "copy-to-clipboard"
import { UtilsContext } from "../screen/main"
import { WalletUtil } from "../utils/wallet_util"

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
        sendToken,
        newWallet,
        getWallet,
    } = WalletUtil();

    const { 
        handleAlertOpen,
        handleLoadingOpen } = useContext(UtilsContext);

    const classes = useStyles();
    const DrawerTitle = 'Wallet';

    const state = useSelector(state => state.walletInfo);

    const [mnemonic, setMnemonic] = useState(state.mnemonic);
    const [privateKey, setPrivateKey] = useState(state.privateKey);
    const [address, setAddress] = useState(state.walletAddress);
    const [accountIndex, setAccountIndex] = useState(state.accountIndex);
    const [balance, setBalance] = useState(state.fctBalance);
    
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [memo, setMemo] = useState('');
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
    
    const onChangeToAddress = (event) => {
        setToAddress(event.target.value);
    }

    const onChangeAmount = (event) => {
        setAmount(event.target.value);
    }
    
    const onChangeMemo = (event) => {
        setMemo(event.target.value);
    }

    const setWalletInfo = (wallet) => {
        setMnemonic(wallet.mnemonic);
        setPrivateKey(wallet.privateKey);
        setAddress(wallet.address);
        setBalance(wallet.balance);
    }

    const resetSendStatus = () => {
        handleLoadingOpen(false);
        setIsSendToken(false);
        setToAddress('');
        setAmount('');
        setMemo('');
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
            let wallet = await newWallet();
            setWalletInfo(wallet)

            handleAlertOpen('Created your wallet', 3000, 'success');
        } catch (error) {
            console.log("[error] " + error);
            handleAlertOpen(error.message, 5000, 'error');
        }
    }
    
    async function getWalletData(idx = 0){
        handleLoadingOpen(true);
        try {
            let wallet = await getWallet(idx);
            setWalletInfo(wallet);
            handleLoadingOpen(false);
        } catch (error) {
            handleLoadingOpen(false);
            console.log("[error] " + error);
            handleAlertOpen(error.message, 5000, 'error');
        }
    }

    const tokenSend = async() => {
        if(toAddress === '') {
            handleAlertOpen('Please fill in to address', 5000, 'error');
            return;
        }
        if(amount === ''){
            handleAlertOpen('Please fill in amount', 5000, 'error');
            return;
        }

        handleLoadingOpen(true);
        try {
            let send = await sendToken(toAddress, amount, memo);
            let wallet = await getWallet();
            setWalletInfo(wallet);
            resetSendStatus();
            handleAlertOpen('Send token success', 3000, 'success');
        } catch (error) {
            console.log("[error] " + error);
            resetSendStatus();
            handleAlertOpen(error.message, 5000, 'error');
        }
    }

    useEffect(() => {
        if(isSendToken){
            tokenSend();
        }
    }, [isSendToken])

    useEffect(() => {
        WalletInfoActions.setAccountIndex(accountIndex);
    }, [accountIndex])

    useEffect(() => {
        if(isCreate){
            createWallet();
        } else {
            if(state.mnemonic !== ''){
                getWalletData(Number(accountIndex));
            }
        }
        return () => {
            setIsCreate(false);
        }
    }, [isCreate, accountIndex])

    useEffect(() => {
        if(open){
            setMnemonic(state.mnemonic);
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
                            Mnemonic
                        </Typography>
                        <ListItem>
                            <Wrapper drawer>
                                <TextField 
                                    className={classes.disabled_textfield}
                                    onClick={(e)=>handleClipboard(e, 'Mnemonic')}
                                    multiline
                                    maxRows={5}
                                    variant="outlined"
                                    value={mnemonic}
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
                        
                        
                        {state.mnemonic !== '' && 
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
                                onChange={onChangeToAddress}
                                value={toAddress}
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
                                onChange={onChangeAmount}
                                value={amount}
                            />
                        </ListItem>
                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            Memo
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                variant="outlined"
                                onChange={onChangeMemo}
                                value={memo}
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