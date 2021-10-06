import { Divider, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper, NftCardTextBox } from "../../utils/public_style"

import { useState } from "react"
import { useEffect } from "react"
import SendNFTSection from "./sendNftSection";

const useStyles = makeStyles(() => ({
    typography_title: {
        width: '50px',
        color: '#fff',
        opacity: '.8',
        textAlign: 'left',
    },
    typography_text: {
        width: '140px',
        color: '#fff',
        textAlign: 'left',
        paddingRight: '10px',
        wordBreak: 'break-word',
    },
    typography_uri: {
        width: '140px',
        textAlign: 'left',
        paddingRight: '10px',
        whiteSpace : 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        cursor: 'pointer', 
        color: 'rgb(29, 134, 255)', 
        textDecoration: 'underline'
    },

    divider: {
        backgroundColor: '#fff',
    },
}));

export default function ListNftSection({open, nfts}) {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(false);
    const [myNFT, setMyNFT] = useState([]);
    
    const fetchNFTJson = async () => {
        setIsFetching(true);
        setMyNFT([]);
        for(let i = 0; i <= nfts.length-1; i++){
            try {
                const nft = nfts[i];
                const idx = i;

                const response = await fetch(nft.tokenURI);
                const jsonData = await response.json();

                const path = await checkImageFile(jsonData.path);

                setMyNFT(myNFT => [...myNFT, {
                    index: idx,
                    id: nft.id,
                    json: jsonData,
                    path: path,
                    open: false,
                }])
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
                console.log("[error] " + error);
            }
        }
    }

    const checkImageFile = async(path) => {
        try {
            const file_res = await fetch(path);
            const file_blob = await file_res.blob();
            return file_blob.type.includes('image')? path : '/assets/file.png';
        } catch (error) {
            return '/assets/file.png';
        }
    }

    const openSendSection = (index) => {
        setMyNFT(myNFT.map(nft => 
            nft.index === index? {...nft, open: !nft.open}:{...nft, open: false}
        ));
    }

    const openTokenURI = (uri) => {
        window.open(uri, '_blank')
    }

    useEffect(() => {
        fetchNFTJson();
    }, [nfts])

    return (
        <>
        <input type="file" id="fileInput" style={{display: 'none'}}/>
        {(!isFetching && myNFT.length === nfts.length) &&
            <>
            {myNFT.map((nft, index) => {
                let toeken_uri = nfts[index].tokenURI.split('https://')[1];
                return (
                    <div key={'nft-info-'+index}>
                        <ListItem>
                            <Wrapper style={{backgroundColor: '#444', borderRadius: '3px'}}>
                                <Wrapper 
                                    style={{width: '100%', display: 'flex', justifyContent: 'space-around', cursor: 'pointer', padding: '0'}}
                                    onClick={()=>openSendSection(index)}
                                >   
                                    <Wrapper style={{padding: '17px 0'}}>
                                        <img 
                                            style={{width: '65px', objectFit: 'contain'}} 
                                            src={nft.path} 
                                            alt='nft_image'
                                        />
                                    </Wrapper>
                                    <Wrapper style={{width: "200px", textAlign: 'left', padding: '10px 0 0 0'}}>
                                        <NftCardTextBox>
                                            <Typography
                                                className={classes.typography_title}
                                                variant='caption'
                                            >
                                                ID : 
                                            </Typography>
                                            <Typography
                                                className={classes.typography_text}
                                                variant='body1'
                                            >
                                                {nft.id}
                                            </Typography>
                                        </NftCardTextBox>
                                        <NftCardTextBox>
                                            <Typography
                                                className={classes.typography_title}
                                                variant='caption'
                                            >
                                                NAME : 
                                            </Typography>
                                            <Typography
                                                className={classes.typography_text}
                                                variant='body1'
                                            >
                                                {nft.json.name}
                                            </Typography>
                                        </NftCardTextBox>
                                        <NftCardTextBox>
                                            <Typography
                                                className={classes.typography_title}
                                                variant='caption'
                                            >
                                                DESC : 
                                            </Typography>
                                            <Typography
                                                className={classes.typography_text}
                                                variant='body1'
                                            >
                                                {nft.json.description}
                                            </Typography>
                                        </NftCardTextBox>
                                    </Wrapper>
                                </Wrapper>
                                <Wrapper style={{float:'right', width: "200px", textAlign: 'left'}}>
                                    <NftCardTextBox>
                                        <Typography
                                            className={classes.typography_title}
                                            variant='caption'
                                        >
                                            URI : 
                                        </Typography>
                                        <Typography
                                            className={classes.typography_uri}
                                            variant='body1'
                                            onClick={()=>openTokenURI(nfts[index].tokenURI)}
                                        >
                                            {toeken_uri}
                                        </Typography>      
                                    </NftCardTextBox>
                                </Wrapper>
                            </Wrapper>
                        </ListItem>
                        {nft.open &&
                            <>
                            <SendNFTSection id={nft.id}/>
                            <Divider className={classes.divider}/>
                            </>
                        }
                    </div>
                )
            })}
            </>
        }
        </>
    )
}
