import { Divider, Typography } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper } from "../../utils/public_style"

import { useState } from "react"
import { useEffect } from "react"
import SendNFTSection from "./sendNftSection";

const useStyles = makeStyles((theme) => ({
    typography_title: {
        width: '60px',
        padding: '0px 10px',
        color: '#fff',
        textAlign: 'left',
        fontSize: '10px'
    },
    typography_text: {
        width: '100%',
        padding: '0px 10px',
        color: '#fff',
        textAlign: 'left',
        ['@media (max-width: 770px)']:{
            wordBreak: 'all',
        },
    },

    divider: {
        backgroundColor: '#fff',
    },
}));


export default function ListNftSection({open, nfts}) {
    const classes = useStyles();

    const [myNFTJson, setMyNFTJson] = useState([]);
    
    const fetchNFTJson = () => {
        if(myNFTJson.length > 0){ setMyNFTJson([]) };

        console.log(nfts);

        nfts.map(async(nft, idx) => {
            nft.tokenURI = nft.tokenURI.replace("https://ipfs-firma-devnet.firmachain.org/", "http://192.168.20.90:8080/");
            const response = await fetch(nft.tokenURI);
            const jsonData = await response.json();

            setMyNFTJson(myNFTJson => [...myNFTJson, {
                index: idx,
                id: nft.id,
                json: jsonData,
                open: false,
            }])
        })
    }

    const openSendSection = (index) => {
        setMyNFTJson(myNFTJson.map(nft => 
                nft.index === index? {...nft, open: !nft.open}:{...nft, open: false}
            ));
    }

    useEffect(() => {
        setMyNFTJson([]);
        fetchNFTJson();
    }, [open, nfts])

    return (
        <>
        {myNFTJson.map((nft, index) => {
            return (
                <>
                <ListItem key={'nft-info-'+index}>
                    <Wrapper 
                        style={{width: '100%', display: 'flex', justifyContent: 'space-around', padding: '5px 10px', backgroundColor: '#444', borderRadius: '3px', cursor: 'pointer'}}
                        onClick={()=>openSendSection(index)}
                    >
                        <img style={{width: '50px', objectFit: 'contain'}} src={nft.json.path} alt='nft_image'/>
                        <Wrapper style={{width: "200px", textAlign: 'left', paddingLeft: '10px'}}>
                            <Wrapper style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '5px 0'}}>
                                <Typography
                                    className={classes.typography_title}
                                    variant='body2'
                                >
                                    ID : 
                                </Typography>
                                <Typography
                                    className={classes.typography_text}
                                    variant='body1'
                                >
                                    {nft.id}
                                </Typography>
                            </Wrapper>
                            <Wrapper style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '5px 0'}}>
                                <Typography
                                    className={classes.typography_title}
                                    variant='body2'
                                >
                                    NAME : 
                                </Typography>
                                <Typography
                                    className={classes.typography_text}
                                    variant='body1'
                                >
                                    {nft.json.name}
                                </Typography>
                            </Wrapper>
                            <Wrapper style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '5px 0'}}>
                                <Typography
                                    className={classes.typography_title}
                                    variant='body2'
                                >
                                    DESC : 
                                </Typography>
                                <Typography
                                    className={classes.typography_text}
                                    variant='body1'
                                >
                                    {nft.json.description}
                                </Typography>
                            </Wrapper>
                        </Wrapper>    
                    </Wrapper>

                </ListItem>
                {nft.open &&
                    <>
                    <SendNFTSection id={nft.id}/>
                    <Divider className={classes.divider}/>
                    </>
                }
                </>
            )
        })}      
        </>
    )
}
