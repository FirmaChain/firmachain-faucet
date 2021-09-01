import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'
import RefreshIcon from '@material-ui/icons/Refresh'

import { Wrapper } from "../utils/public_style"

import React, { useContext, useState } from "react"
import { useEffect } from "react"

import { useSelector } from "react-redux"
import { Wallet } from "../utils/wallet"

import { WalletInfoActions } from "../redux/actions"
import { UtilsContext } from "../screen/main"

export const TapNFTContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '50px',
    },

    divider: {
        backgroundColor: '#fff',
    },
    vertical_divider: {
        height: 28,
        margin: 4,
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
    attach_textfield: {
        fontSize: '12px',
        width: '100%',
        padding: '0 10px'
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
        margin: '0 5px',
    },
    
    account_select: {
        backgroundColor: '#fff',
        borderRadius: '3px',
        width: '50px',
    },
}));

export default function NftDrawer({open, handleNftDrawer}) {
    const classes = useStyles();
    const DrawerTitle = 'NFT';

    const state = useSelector(state => state.walletInfo);

    const [myNFT, setMyNFT] = useState('');

    const { 
        getTokenBalance,
        getAllNFT,
        getNFTBalanceAll, } = Wallet();

    const closeDrawer = () => {
        handleNftDrawer(false)
    };

    const getBalance = async() => {
        try {
            let _balance = await getTokenBalance(state.walletAddress);
            WalletInfoActions.setFctBalance(_balance);
        } catch (error) {
            console.log("[error] " + error);
        }
    }

    return (
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
                                onClick={()=>getBalance()}
                            />
                        </Wrapper>

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
                            Wallet Address
                        </Typography>
                        <ListItem>
                            <TextField
                                className={classes.disabled_textfield}
                                variant="outlined"
                                value={state.walletAddress}
                                disabled
                            />
                        </ListItem>
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
                                    value={state.fctBalance+'fct'}
                                />
                            </Wrapper>
                        </ListItem>
                    </List>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}
