import ReCAPTCHA from 'react-google-recaptcha';
import { Paper, InputBase, Divider, IconButton, Button, Select, MenuItem, Typography, Card, CardContent } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Container, ContentsContainer, BackgroundBox, Wrapper, BackgroundBlur, MainBox, LogBox, ReCaptchaBox, MainTitle, LogCardWrapper, LogSendTag, HeaderBox } from '../utils/public_style';

import { Wallet } from '../utils/wallet';

const Video_Background = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

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
    const [sendingState, setSendingState] = useState(false);

    const [openRecaptcha, setOpenRecaptcha] = useState(false);

    const [resultLog, setResultLog] = useState(null)

    const classes = useStyles();
    const [sendAddressInput, setSendAddressInput] = useState('');

    const [network, setNetwork] = useState('imperium');
    const networkData = ['imperium', 'colosseum'];

    const { 
        changeChainTxAddress,
        sendTokenFromFaucet, } = Wallet();

    const moveToExplorer = () => {
        window.open('https://explorer-devnet.firmachain.org/', '_blank')
    }
    
    const moveToExplorerTransaction = (hash) => {
        window.open('https://explorer-devnet.firmachain.org/transactions/'+hash, '_blank')
    }
    
    const handleRecaptcha = (value) => {
        {value && sendAddress()}
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
            return;
        }
        setOpenRecaptcha(true);
    }

    const sendAddress = async() => {
        // 전송중이면 return
        if(sendingState)return;
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

            resetSendAddressInputText();
            setOpenRecaptcha(false);
            setSendingState(false);
        } catch (error) {
            console.log("[error] " + error);
            setOpenRecaptcha(false);
            setSendingState(false);
        }
    }

    return (
        <>
            <Container>
                <BackgroundBlur />
                <BackgroundBox>
                    <Video_Background muted autoPlay loop>
                        <source src="/assets/binary.mp4" type="video/mp4" />
                    </Video_Background>
                </BackgroundBox>

                <ContentsContainer>
                    <HeaderBox>
                        <MainTitle
                            banner
                            src="/assets/firma_chain_title.svg"
                            onClick={() => moveToExplorer()}
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
                        <MainTitle src="/assets/firma_chain_title.svg" />
                        <Wrapper style={{ padding: '10px 0 50px 0' }}>
                            <Paper className={classes.paper}>
                                <InputBase
                                    disabled={sendingState}
                                    className={classes.input}
                                    placeholder="Address"
                                    value={sendAddressInput}
                                    onChange={handleSendAddressInputText}
                                />
                                <Divider
                                    className={classes.vertical_divider}
                                    orientation="vertical"
                                />
                                <IconButton
                                    disabled={sendingState}
                                    color="primary"
                                    className={classes.iconButton}
                                    onClick={() => activateSendProcess()}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Paper>
                        </Wrapper>
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
                </ContentsContainer>
            </Container>
        </>
    );
}
