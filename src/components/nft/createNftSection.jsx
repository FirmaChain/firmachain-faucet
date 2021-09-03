import { Button, IconButton, Paper } from "@material-ui/core"
import { TextField, InputBase, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import FileIcon from '@material-ui/icons/AttachFile'

import { Wrapper } from "../../utils/public_style"

import { useContext, useEffect } from "react"
import { useState } from "react";

import { useSelector } from "react-redux"
import { Wallet } from "../../utils/wallet"
import { UtilsContext } from "../../screen/main";
import { TapNFTContext } from "../nft_drawer";

const IPFS = require('../../utils/ipfs_api');

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

export default function CreateNFTSection(open) {
    const { handleNFTButtons } = useContext(TapNFTContext);

    let FirmaIPFSRead = new IPFS();
    FirmaIPFSRead.setIPFSNode('https://ipfs-firma-devnet.firmachain.org');
    // FirmaIPFSRead.setIPFSNode('http://192.168.20.90:8080');

    let FirmaIPFSWrite = new IPFS();
    FirmaIPFSWrite.setIPFSNode('https://ipfs-api-firma-devnet.firmachain.org');
    
    const state = useSelector(state => state.walletInfo);
    
    const classes = useStyles();
    
    const [nftFile, setNftFile] = useState(null);
    const [nftFileName, setNftFileName] = useState('');
    const [nftName, setNftName] = useState('');
    const [nftDesc, setNftDesc] = useState('');

    const [isMintNFT, setIsMintNFT] = useState(false);
    
    const { 
        MintNFT } = Wallet();

    const onChangeNftName = (event) => {
        setNftName(event.target.value);
    }

    const onChangeNftDesc = (event) => {
        setNftDesc(event.target.value);
    }

    const fileChangedHandler = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.readAsArrayBuffer(file);

        reader.onload = function() {
            setNftFileName(file.name);
            setNftFile(reader.result);
        }
        
        reader.onerror = function() {
            console.log(reader.error);
        };
    };

    const mintNFT = async() => {
        if(nftFile === null || nftName === '' || nftDesc === '') return;

        try {
            let fileHash = await FirmaIPFSWrite.addFile(nftFile);
            let fileUrl = FirmaIPFSRead.getURLFromHash(fileHash);

            let Json = '{\"name\" : \"'+ nftName+'\", \"description\" : \"'+ nftDesc+'\", \"path\" : \"'+ fileUrl+'\"}';
            let JsonHash = await FirmaIPFSWrite.addJson(Json);

            let jsonUrl = FirmaIPFSRead.getURLFromHash(JsonHash);

            let result = await MintNFT(state.privateKey, jsonUrl);

            handleNFTButtons('list');
            setIsMintNFT(false);
        } catch(error) {
            console.log(error);
            setIsMintNFT(false);
        }
    }

    useEffect(() => {
        if(isMintNFT){
            mintNFT();
        }
    }, [isMintNFT])
    
    useEffect(() => {
    }, [open])

    return (
        <>
        <Typography
            className={classes.typography_text}
            variant='body2'
        >
            Attach Image File
        </Typography>
        <ListItem>
            <Paper className={classes.paper}>
                <InputBase 
                    className={classes.attach_textfield}
                    disabled
                    value={nftFileName}
                />
                <Divider className={classes.vertical_divider} orientation="vertical" />
                <IconButton color="primary" component="label">
                    <FileIcon />
                    <input id={"ntf_file_input"} style={{ display: 'none' }} type="file" name="imageFile" onChange={fileChangedHandler}/>
                </IconButton>
            </Paper>
        </ListItem>
        <Typography
            className={classes.typography_text}
            variant='body2'
        >
            Name
        </Typography>
        <ListItem>
            <TextField
                className={classes.disabled_textfield}
                variant="outlined"
                onChange={onChangeNftName}
                value={nftName}
            />
        </ListItem>
        <Typography
            className={classes.typography_text}
            variant='body2'
        >
            Description
        </Typography>
        <ListItem>
            <TextField
                className={classes.disabled_textfield}
                multiline
                maxRows={5}
                variant="outlined"
                onChange={onChangeNftDesc}
                value={nftDesc}
            />
        </ListItem>
        <Wrapper>
            <Button 
                className={classes.button}
                variant="contained"
                onClick={()=>setIsMintNFT(true)}
                disabled={isMintNFT}
            >Create</Button>
        </Wrapper>
        </>
    )
}
