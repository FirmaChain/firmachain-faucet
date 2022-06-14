import { Button, ClickAwayListener } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { List, ListItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'
import RefreshIcon from '@material-ui/icons/Refresh'

import { Wrapper } from "../utils/public_style"

import React, { useContext, useMemo, useState } from "react"
import { useEffect } from "react"

import { useSelector } from "react-redux"
import ListNFTSection from "./nft/listNftSection"
import CreateNFTSection from "./nft/createNftSection"

import copy from "copy-to-clipboard"
import { WalletInfoActions } from "../redux/actions"
import { UtilsContext } from "../screen/main"
import { NftUtil } from "../utils/nft_util"
import { WalletUtil } from "../utils/wallet_util"

export const TabNFTContext = React.createContext();

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
    const {
        nftIdList,
    } = NftUtil();

    const {
        getWalletBalance,
    } = WalletUtil();
    
    const { 
        handleAlertOpen, 
        handleLoadingOpen 
    } = useContext(UtilsContext);

    const classes = useStyles();
    const DrawerTitle = 'NFT';

    const {walletInfo, option} = useSelector(state => state);

    const [NFTIdList, setNFTIdList] = useState([]);

    const denom = useMemo(() => {
        let value = "";
        if(option.denom.length > 0){
            value = option.denom.substr(1, option.denom.length);
        }
        return value;
    }, [option.denom])

    // Drawer section open 관련 변수
    const [openListNFT, setOpenListNFT] = useState(false);
    const [openCreateNFT, setOpenCreateNFT] = useState(true);

    const handleClipboard = (event, label) => {
        if(event.target.value === '' || event.target.value === undefined){
            return;
        }
        copy(event.target.value);
        handleAlertOpen('Coppied ' + label, 3000, 'success');
    };

    const handleNFTButtons = (target) => {
        setOpenCreateNFT(target === 'create');
        setOpenListNFT(target === 'list');
    }

    const closeDrawer = () => {
        handleNftDrawer(false)
    };

    const getAllNFTInfo = async() => {
        handleLoadingOpen(true);
        try {
            await nftIdList().then(res => setNFTIdList(res));

            getBalance();
            handleLoadingOpen(false);
        } catch(error) {
            console.log("[error] " + error);
            handleLoadingOpen(false);
        }
    }

    const getBalance = async() => {
        try {
            let _balance = await getWalletBalance();
            WalletInfoActions.setFctBalance(_balance);
        } catch (error) {
            console.log("[error] " + error);
        }
    }

    useEffect(() => {
        if(openListNFT){
            getAllNFTInfo();
        }
    }, [openListNFT])

    useEffect(() => {
        if(open){
            setOpenCreateNFT(false);
            setOpenListNFT(true);
        } else {
            setOpenCreateNFT(false);
            setOpenListNFT(false);
        }
    }, [open])

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
                                onClick={(e)=>handleClipboard(e, 'Wallet Address')}
                                variant="outlined"
                                value={walletInfo.walletAddress}
                                disabled
                            />
                        </ListItem>
                        <Typography
                            className={classes.typography_text}
                            variant='body2'
                        >
                            {denom.toUpperCase() + " Balance"}
                        </Typography>
                        <ListItem>
                            <Wrapper drawer>
                                <TextField 
                                    className={classes.disabled_textfield}
                                    variant="outlined"
                                    disabled
                                    value={walletInfo.fctBalance + denom}
                                />
                            </Wrapper>
                        </ListItem>
                        <Divider className={classes.divider}/>
                        <Wrapper style={{display: NFTIdList.length > 0 &&'flex'}}>
                            {NFTIdList.length > 0 &&
                                <Button 
                                    className={classes.button}
                                    variant="contained"
                                    onClick={()=>handleNFTButtons('list')}
                                >List</Button>
                            }
                            <Button 
                                className={classes.button}
                                variant="contained"
                                onClick={()=>handleNFTButtons('create')}
                            >Create</Button>
                        </Wrapper>
                        
                        <TabNFTContext.Provider value={{handleNFTButtons, getAllNFTInfo}}>
                            {/* LIST SECTION */}
                            {(openListNFT && NFTIdList.length > 0) && 
                            <ListNFTSection open={openListNFT} idList={NFTIdList}/>
                            }

                            {/* CREATE SECTION */}
                            {openCreateNFT &&
                            <CreateNFTSection open={openCreateNFT}/>
                            }
                        </TabNFTContext.Provider>
                    </List>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}
