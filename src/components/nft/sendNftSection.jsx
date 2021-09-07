import { Button, Select, MenuItem } from "@material-ui/core"
import { TextField, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper } from "../../utils/public_style"

import { useContext, useState } from "react"
import { useEffect } from "react"

import { WalletInfoActions } from "../../redux/actions"
import { useSelector } from "react-redux"

import { Wallet } from "../../utils/wallet"
import { TapNFTContext } from "../nft_drawer";

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

// export default function SendNFTSection({open, nfts, getAllNFTInfo}) {
export default function SendNFTSection({id}) {
    const { getAllNFTInfo } = useContext(TapNFTContext);

    const classes = useStyles();

    const state = useSelector(state => state.walletInfo);
    
    const [toAddressInputText, settoAddressInputText] = useState('');
    
    const [isTransferNFT, setIsTransferNFT] = useState(false);

    const NftIdIndex = id;
    
    const { 
        TransferNFT,
        getTokenBalance, } = Wallet();
    
    const onChangetoAddressInputTextess = (event) => {
        settoAddressInputText(event.target.value);
    }
    
    const transferNFTToken = async() => {
        try {
            let transfer = await TransferNFT(state.privateKey, toAddressInputText, Number(NftIdIndex))
            let balance = await getTokenBalance(state.walletAddress);
            WalletInfoActions.setFctBalance(balance);

            getAllNFTInfo();
            setIsTransferNFT(false);
        } catch (error) {
            console.log("[error] " + error);
        }
    }
    
    useEffect(() => {
        if(isTransferNFT){
            transferNFTToken();
        }
    }, [isTransferNFT])

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
                onChange={onChangetoAddressInputTextess}
                value={toAddressInputText}
            />
        </ListItem>
        <Wrapper>
            <Button 
                className={classes.button}
                variant="contained"
                disabled={isTransferNFT}
                onClick={()=>setIsTransferNFT(true)}
            >Send</Button>
        </Wrapper>
        </>
    )
}
