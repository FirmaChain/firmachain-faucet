import ReCAPTCHA from 'react-google-recaptcha';
import { Paper, InputBase, Divider, IconButton, Button, Select, MenuItem, Typography, Snackbar, Card, CardContent } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Container, ContentsContainer, BackgroundBox, Wrapper, BackgroundBlur, MainBox, LogBox, FooterBox, ReCaptchaBox, MainButtonWrapper, MainTitle, MainButtonBox, LogCardWrapper, LogSendTag, HeaderBox } from '../utils/public_style';

import { WalletInfoActions } from '../redux/actions';

import WalletDrawer from '../components/wallet_drawer';
import RecoverDrawer from '../components/recover_drawer';
import NftDrawer from '../components/nft_drawer';

import { Wallet } from '../utils/wallet';
import { LoadingProgress } from '../components/loading/loading_progress';

import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

export const UtilsContext = React.createContext();

const Video_Background = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const useStyles = makeStyles((theme) => ({
    // input style
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '40%',
        height: '50px',
        minWidth: '350px',
        maxWidth: '500px',
    },
    list: {
        width: '100%',
        maxWidth: '500px',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        backgroundColor: '#fff',
    },
    vertical_divider: {
        height: 28,
        margin: 4,
    },

    // drawer style
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
    select: {
        backgroundColor: '#fff',
        borderRadius: '3px',
        width: '50px',
    },
    text: {
        padding: '10px',
        color: '#fff',
        ['@media (max-width: 770px)']:{
            wordBreak: 'all',
        },
    },

    // button style
    main_button: {
        margin: '10px',
        width: '100%',
        maxWidth: '250px',
    },
    drawer_button: {
        width: '100px',
        marginTop: '10px',
    },

    // card style
    card: {
        margin: '15px 0',
        width: '100%',
    },
    card_text: {
        padding: '10px',
        color: '#818181',
        ['@media (max-width: 770px)']:{
            wordBreak: 'all',
        },
    },

    network_select: {
        width: '120px',
        marginRight: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '3px',
    },
    footer_text: {
        padding: '10px 20px',
        color: '#818181',
        ['@media (max-width: 770px)']:{
            fontSize: '13px',
            padding: '5px 20px',
        },
    },
}));

export default function Main() {
    const state = useSelector(state => state.walletInfo);

    const [openRecaptcha, setOpenRecaptcha] = useState(false);

    const [sendingState, setSendingState] = useState(false);
    const [resultLog, setResultLog] = useState(null)

    const classes = useStyles();
    const [sendAddressInput, setSendAddressInput] = useState('');

    const [network, setNetwork] = useState('imperium');
    const networkData = ['imperium', 'colosseum'];

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertTimer, setAlertTimer] = useState(1000);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    
    const [openWalletDrawer, setOpenWalletDrawer] = useState(false);
    const [openRecoverDrawer, setOpenRecoverDrawer] = useState(false);
    const [openNftDrawer, setOpenNftDrawer] = useState(false);

    const { 
        changeChainTxAddress,
        sendTokenFromFaucet,
        getTokenBalance, } = Wallet();


    const moveToExplorer = () => {
        window.open('https://explorer-devnet.firmachain.org/', '_blank')
    }

    const moveToExplorerTransaction = (hash) => {
        window.open('https://explorer-devnet.firmachain.org/transactions/'+hash, '_blank')
    }
 
    const handleRecaptcha = (value) => {
        {value && sendAddress()}
    }

    const handleAlertOpen = (label, timer, type) => {
        setAlertMessage(label);
        setAlertTimer(timer);
        setAlertType(type);
        setAlertOpen(true);
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const handleLoadingOpen = (loading) => {
        setIsLoading(loading)
    }

    const handleSendAddressInputText = (event) => {
        setSendAddressInput(event.target.value);
    }

    const resetSendAddressInputText = () => {
        setSendAddressInput('');
    }

    const handleNetwork = (event) => {
        setNetwork(event.target.value);
        switch (event.target.value) {
            case 'imperium':
                return changeChainTxAddress('https://imperium-node1.firmachain.org:26657');
            case 'colosseum':
                return changeChainTxAddress('https://colosseum-node1.firmachain.org:26657');
            default:
                break;
        }
    }

    const activateSendProcess = () => {
        if(sendAddressInput === ''){
            handleAlertOpen('Please fill in Address', 5000, 'error');
            return;
        }
        setOpenRecaptcha(true);
    }

    const sendAddress = async() => {
        // 전송중이면 return
        if(sendingState)return;
        handleLoadingOpen(true);
        setSendingState(true);

        try {
            let testFCTAmount = 1000; // 2000fct(테라 기준)
            let result = await sendTokenFromFaucet(sendAddressInput, testFCTAmount);
            console.log(result.code);
            const resultCode = result.code === 0? 'Success':result.code;
            setResultLog({
                code : resultCode,
                gasUsed: result.gasUsed,
                gasWanted: result.gasWanted,
                height: result.height,
                transactionHash: result.transactionHash,
                rawLog: result.rawLog
            })
            handleAlertClose();
            
            let balance = await getTokenBalance(sendAddressInput);
            WalletInfoActions.setFctBalance(balance);

            resetSendAddressInputText();
            setOpenRecaptcha(false);
            handleLoadingOpen(false);
            setSendingState(false);
        } catch (error) {
            console.log("[error] " + error);
            handleAlertOpen(error.message, 5000, 'error');
            setSendingState(false);
            setOpenRecaptcha(false);
            handleLoadingOpen(false);
        }
    }

    const handleWalletDrawer = (open) => {
        setOpenWalletDrawer(open);
    }
    
    const handleRecoverDrawer = (open) => {
        setOpenRecoverDrawer(open);
    }
    
    const handleNftDrawer = (open) => {
        setOpenNftDrawer(open);
    }

    useEffect(() => {
        if(resultLog){
            setResultLog(null);
        }
    }, [state.nemonic, state.privateKey, state.walletAddress])

    return (
        <>
        <Container>
            <BackgroundBlur/>
            <BackgroundBox>
                <Video_Background muted autoPlay loop>
                    <source src='/assets/binary.mp4' type='video/mp4'/>
                </Video_Background>            
            </BackgroundBox>
            
            <ContentsContainer>
                <HeaderBox>
                    <MainTitle 
                        banner
                        src='/assets/firma_chain_title.svg' 
                        onClick={()=>moveToExplorer()}
                    />
                    <Select
                        className={classes.network_select}
                        value={network}
                        onChange={(e)=>handleNetwork(e)}
                        MenuProps={{ disablePortal: true }}
                    >
                        {networkData.map((network) => {
                            return (
                                <MenuItem value={network} key={'select-option-'+network}>{network}</MenuItem>
                            )
                        })}
                    </Select>
                </HeaderBox>

                <MainBox>
                    <MainTitle src='/assets/firma_chain_title.svg' />
                    <Wrapper style={{padding: '10px 0 50px 0'}}>
                        <Paper className={classes.paper}>
                            <InputBase
                                disabled={sendingState}
                                className={classes.input}
                                placeholder="Address"
                                value={sendAddressInput}
                                onChange={handleSendAddressInputText}   
                            />
                            <Divider className={classes.vertical_divider} orientation="vertical" />
                            <IconButton disabled={sendingState} color="primary" className={classes.iconButton} onClick={()=>activateSendProcess()}>
                                <SendIcon />
                            </IconButton>
                        </Paper>             
                    </Wrapper>
                    <MainButtonBox>
                        <MainButtonWrapper>
                            <Button
                                className={classes.main_button}
                                variant="contained"
                                onClick={()=>setOpenWalletDrawer(true)}
                            >
                                wallet
                            </Button>
                            <Button
                                className={classes.main_button}
                                variant="contained"
                                onClick={()=>setOpenRecoverDrawer(true)}
                            >
                                Recover
                            </Button>
                            <Button
                                className={classes.main_button}
                                variant="contained"
                                onClick={()=>setOpenNftDrawer(true)}
                            >
                                NFT
                            </Button>
                        </MainButtonWrapper>
                    </MainButtonBox>
                </MainBox>
                
                {openRecaptcha &&
                    <ReCaptchaBox>
                        <ReCAPTCHA 
                            style={{ display: "inline-block", height: '35px'}}
                            theme="light"
                            sitekey='6LdSn0ocAAAAABEVdMZQJPk8wHPL4yGg6AHzfDh-' 
                            onChange={handleRecaptcha}
                        />
                    </ReCaptchaBox>
                }

                {resultLog &&
                <LogBox>
                    <Card className={classes.card}>
                        <CardContent>
                            <LogSendTag>{resultLog.code}</LogSendTag>
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    hash
                                </Typography>
                            </LogCardWrapper>
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    <a style={{color: '#1D86FF', cursor: 'pointer'}} onClick={()=>moveToExplorerTransaction(resultLog.transactionHash)}>{resultLog.transactionHash}</a>
                                </Typography>
                            </LogCardWrapper>
                            <Divider />
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    gasUsed
                                </Typography>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    {resultLog.gasUsed} 
                                </Typography>
                            </LogCardWrapper>
                            <Divider />
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    gasWanted
                                </Typography>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    {resultLog.gasWanted} 
                                </Typography>
                            </LogCardWrapper>
                            <Divider />
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    rawLog
                                </Typography>
                            </LogCardWrapper>
                            <LogCardWrapper>
                                <Typography className={classes.card_text} variant="body2" component="p">
                                    {resultLog.rawLog}
                                </Typography>
                            </LogCardWrapper>
                        </CardContent>
                    </Card>
                </LogBox>
                }

                <FooterBox>
                    <Typography
                        className={classes.footer_text}
                        variant='body1'
                    >
                        Copyright © FirmaChain 2021
                    </Typography>
                    <Typography
                        className={classes.footer_text}
                        variant='body1'
                    >
                        Maintained By <a style={{color: '#1D86FF'}} href="https://firmachain.org/">FirmaChain</a>
                    </Typography>
                </FooterBox>
            </ContentsContainer>
        </Container>
        
        <UtilsContext.Provider value={{handleAlertOpen, handleLoadingOpen}}>
        {/* Drawer */}
        <WalletDrawer open={openWalletDrawer} handleWalletDrawer={handleWalletDrawer}/>
        <RecoverDrawer open={openRecoverDrawer} handleRecoverDrawer={handleRecoverDrawer} handleWalletDrawer={handleWalletDrawer}/>
        <NftDrawer open={openNftDrawer} handleNftDrawer={handleNftDrawer}/>
        
        {/* Alert */}
        <Snackbar 
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={alertOpen}
            autoHideDuration={alertTimer}
            onClose={handleAlertClose}
        >
            <Alert severity={alertType}>
                {alertMessage}
            </Alert>
        </Snackbar>        

        {/* Loading */}
        <LoadingProgress open={isLoading}/>
        </UtilsContext.Provider>
        </>
    )
}
