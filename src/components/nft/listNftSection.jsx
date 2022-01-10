import { Divider, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper, NftCardTextBox } from "../../utils/public_style"

import { useContext, useState } from "react"
import { useEffect } from "react"
import SendNFTSection from "./sendNftSection";
import { NftUtil } from "../../utils/nft_util";
import { UtilsContext } from "../../screen/main";

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

export default function ListNftSection({open, idList}) {
    const {
        getNftItemFromId,
    } = NftUtil();
    
    const { 
        handleLoadingOpen 
    } = useContext(UtilsContext);

    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(false);

    const [nfts, setNfts] = useState([]);
    const [myNFT, setMyNFT] = useState([]);

    const organizeNfts = async () => {
        handleLoadingOpen(true);
        let list = [];
        for(let i = 0; i < idList.length; i++){
            await getNftItemFromId(idList[i])
            .then(res => list.push(res))
            .catch(error => {
                console.log("[error] " + error);
                handleLoadingOpen(false)
            });
        } 
        setNfts(list);
    }
    
    const fetchNFTJson = async () => {
        setIsFetching(true);
        setMyNFT([]);
        for(let i = 0; i < nfts.length; i++){
            const nft = nfts[i];
            const idx = i;
            let fetchWithTokenURI = true;

            const response = await fetch(nft.tokenURI).then((res) => {
                return res;
            }).catch((error) => {
                console.log(error);
                fetchWithTokenURI = false;
                setMyNFT(myNFT => [...myNFT, {
                    index: idx,
                    id: nft.id,
                    json: null,
                    path: '/assets/file.png',
                    open: false,
                }]);
            });

            if(fetchWithTokenURI){
                try {
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
                    handleLoadingOpen(false);
                    console.log("[error] " + error);
                }
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
        organizeNfts();
    }, [idList])
    
    useEffect(() => {
        fetchNFTJson();
    }, [nfts])

    useEffect(() => {
        if(myNFT.length === idList.length) handleLoadingOpen(false);
    }, [myNFT])

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
                                    {nft.path && 
                                        <Wrapper style={{padding: '17px 0'}}>
                                            <img 
                                                style={{width: '65px', objectFit: 'contain'}} 
                                                src={nft.path} 
                                                alt='nft_image'
                                            />
                                        </Wrapper>
                                    }
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
                                        {nft.json && 
                                        <>
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
                                        </>
                                        }
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
