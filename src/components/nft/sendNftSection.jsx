import { Button } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper } from "../../utils/public_style"

import { useContext, useState } from "react"
import { useEffect } from "react"

import { useSelector } from "react-redux"

import { UtilsContext } from "../../screen/main";
import { TabNFTContext } from "../nft_drawer";

import {FirmaSDK, FirmaConfig} from "@firmachain/firma-js";
import { NftUtil } from "../../utils/nft_util";

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

export default function SendNFTSection({id}) {
    const {
        transferNft
    } = NftUtil();

    const { 
        getAllNFTInfo 
    } = useContext(TabNFTContext);

    const { 
        handleAlertOpen,
        handleLoadingOpen,
    } = useContext(UtilsContext);

    const classes = useStyles();

    const [toAddress, setToAddress] = useState('');
    const [memo, setMemo] = useState('');
    
    const [isSendNFT, setIsSendNFT] = useState(false);
    const [isBurnNFT, setIsBurnNFT] = useState(false);

    const NftIdIndex = id;
    
    const onChangeToAddress = (event) => {
        setToAddress(event.target.value);
    }
    
    const onChangeMemo = (event) => {
        setMemo(event.target.value);
    }

    const resetTransferStatus = () => {
        setIsSendNFT(false);
        setIsBurnNFT(false);
        handleLoadingOpen(false);
    }
    
    const NFTTransfer = async() => {
        handleLoadingOpen(true);
        try {
            // memo 들어가야 함
            let transfer = await transferNft(
                isSendNFT? 'send' : 'burn',
                isSendNFT? toAddress : '',
                Number(NftIdIndex),
                memo);

            getAllNFTInfo();
            resetTransferStatus();
            handleAlertOpen(isSendNFT? 'Transfer NFT success':'Burned NFT', 3000, 'success');
        } catch (error) {
            resetTransferStatus();
            handleAlertOpen(error.message, 3000, 'error');
            console.log("[error] " + error);
        }
    }

    useEffect(() => {
        if(isSendNFT || isBurnNFT) NFTTransfer();
    }, [isSendNFT, isBurnNFT])

    return (
        <>
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
                disabled={isSendNFT || isBurnNFT}
                onClick={()=>setIsSendNFT(true)}
            >Send</Button>
        </Wrapper>
        
        <Wrapper>
            <Button 
                className={classes.button}
                variant="contained"
                disabled={isSendNFT || isBurnNFT}
                onClick={()=>setIsBurnNFT(true)}
            >Burn</Button>
        </Wrapper>
        </>
    )
}
