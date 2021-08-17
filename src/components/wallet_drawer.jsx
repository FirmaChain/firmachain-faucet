import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Select, MenuItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'

import { Wrapper } from "../utils/public_style"

import { useState } from "react"
import { useEffect } from "react"

import { Wallet } from "../utils/wallet"

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
    const classes = useStyles();
    const DrawerTitle = 'Wallet';

    const {
        createNewWallet,
        getPrivateKey,
        getAddressFromPrivateKey,
    } = Wallet();
    
    const [nemonic, setNemonic] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [address, setAddress] = useState('');
    const [accountIndex, setAccountIndex] = useState('');

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
        } catch (error) {
            console.log("[error] " + error);
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
        } catch (error) {
            console.log("[error] " + error);
        }
    }

    useEffect(() => {
        if(isCreate){
            createWallet();        
        } else {
            if(nemonic !== ''){
                getWalletData(Number(accountIndex));
            }
        }
        return () => {
            setIsCreate(false);
        }
    }, [isCreate, accountIndex])

    useEffect(() => {
        setNemonic('');
        setPrivateKey('');
        setAddress('');
        setAccountIndex('');
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
                                variant="outlined"
                                value={address}
                                disabled
                            />
                        </ListItem>
                        
                        {nemonic !== '' && 
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
                    </List>
                </div>
            </ClickAwayListener>
        </Drawer>
        </>
    )
}
