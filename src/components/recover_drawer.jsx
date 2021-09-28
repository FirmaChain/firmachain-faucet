import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'

import { Wrapper } from "../utils/public_style"

import { useContext, useState } from "react"
import { useEffect } from "react"

import { WalletInfoActions } from "../redux/actions"
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
    const {
        recoverWallet,
    } = WalletUtil();

    const { 
        handleAlertOpen 
    } = useContext(UtilsContext);

    const classes = useStyles();
    const DrawerTitle = 'Recover';

    const [mnemonic, setMnemonic] = useState('');
    const [privateKey, setPrivateKey] =  useState('');

    const [recovery, setRecovery] = useState(false);

    const closeDrawer = () => {
        handleRecoverDrawer(false)
    };

    const openWalletDrawer = () => {
        handleWalletDrawer(true);
    }

    const onChangeMnemonicInput = (event) => {
        setMnemonic(event.target.value);
    }

    const onChangePrivateKeyInput = (event) => {
        setPrivateKey(event.target.value)
    }

    const walletRecover = async() => {
        if(mnemonic === '' && privateKey === ''){
            handleAlertOpen('Please fill in Mnemonic or Privete key', 5000, 'error');
            return;
        } else {
            try{
                let wallet;
                if(mnemonic !== ''){
                    wallet = await recoverWallet(mnemonic, 'mnemonic');
                } else {
                    wallet = await recoverWallet(privateKey, 'privatekey');
                }

                WalletInfoActions.setWalletExist(true);

                handleAlertOpen('Recovered your wallet', 3000, 'success');
                closeDrawer();
                openWalletDrawer();
            } catch(error) {
                console.log("[error] " + error);
                handleAlertOpen(error.message, 3000, 'error');
            }
        }
    }

    useEffect(() => {
        if(recovery){
            walletRecover();
        }
        return () => {
            setRecovery(false);
        }
    }, [recovery])

    useEffect(() => {
        if(open){
            setMnemonic('');
            setPrivateKey('');
        }
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
                            Mnemonic
                        </Typography>
                        <ListItem>
                            <TextField 
                                className={classes.disabled_textfield}
                                multiline
                                maxRows={5}
                                variant="outlined"
                                onChange={onChangeMnemonicInput}
                                value={mnemonic}
                            />
                        </ListItem>

                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            Private Key
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                variant="outlined"
                                onChange={onChangePrivateKeyInput}
                                value={privateKey}
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
