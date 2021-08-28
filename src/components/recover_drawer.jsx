import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'

import { Wrapper } from "../utils/public_style"

import { useState } from "react"
import { useEffect } from "react"

import { Wallet } from "../utils/wallet"
import { WalletInfoActions } from "../redux/actions"
import { useSelector } from "react-redux"

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

export default function RecoverDrawer({open, handleRecoverDrawer, handleWalletDrawer}) {
    const classes = useStyles();
    const DrawerTitle = 'Recover';

    const {
        getPrivateKey,
        getAddressFromPrivateKey,
        getTokenBalance,
    } = Wallet();
    
    const [nemonic, setNemonic] = useState('');

    const [recovery, setRecovery] = useState(false);

    const closeDrawer = () => {
        handleRecoverDrawer(false)
    };

    const openWalletDrawer = () => {
        handleWalletDrawer(true);
    }

    const onChangeNemonicInput = (event) => {
        setNemonic(event.target.value);
    }

    const recoverWallet = async() => {
        if(nemonic === ''){
            return;
        } else {
            try{
                let _privateKey;
                let _walletAdr;
                let _balance;

                WalletInfoActions.setNemonic(nemonic);
                _privateKey = await getPrivateKey(nemonic, 0);
                WalletInfoActions.setPrivateKey(_privateKey);

                _walletAdr = await getAddressFromPrivateKey(_privateKey);
                WalletInfoActions.setWalletAddress(_walletAdr);

                _balance = await getTokenBalance(_walletAdr);
                WalletInfoActions.setFctBalance(_balance);

                WalletInfoActions.setWalletExist(true);

                closeDrawer();
                openWalletDrawer();
            } catch(error) {
                console.log("[error] " + error);
            }
        }
    }

    useEffect(() => {
        if(recovery){
            recoverWallet();
        }
        return () => {
            setRecovery(false);
        }
    }, [recovery])

    useEffect(() => {
        setNemonic('');
    }, [open])

    return (
        <Drawer anchor={'right'} open={open}>
            <ClickAwayListener onClickAway={closeDrawer}>
                <div style={{width: '335px', height: '100%', padding: '20px', backgroundColor: '#333', zIndex: '0', overflowY: 'auto'}}>
                    <Wrapper style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography
                            className={classes.typography_text}
                            variant='h5'
                        >
                            {DrawerTitle}
                        </Typography>
                        <CloseIcon 
                            style={{color: '#fff', cursor: 'pointer'}}
                            onClick={()=>closeDrawer()}
                        />
                    </Wrapper>
                    <Divider className={classes.divider}/>
                    <List>
                        <Typography
                        className={classes.typography_text}
                        variant='body2'
                        >
                            Nemonic
                        </Typography>
                        <ListItem>
                            <TextField 
                                className={classes.disabled_textfield}
                                multiline
                                maxRows={5}
                                variant="outlined"
                                onChange={onChangeNemonicInput}
                                value={nemonic}
                            />
                        </ListItem>
                        
                        <Wrapper>
                            <Button
                                className={classes.button}
                                variant="contained"
                                onClick={()=>setRecovery(true)}
                                >
                                    Recover
                            </Button>
                        </Wrapper>
                    </List>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}