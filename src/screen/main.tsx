import ReCAPTCHA from 'react-google-recaptcha';
import { Divider, MenuItem, Snackbar, CardContent, SnackbarCloseReason, Alert, AlertColor } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Container,
	ContentsContainer,
	BackgroundBox,
	Wrapper,
	BackgroundBlur,
	MainBox,
	LogBox,
	FooterBox,
	ReCaptchaBox,
	MainButtonWrapper,
	MainTitle,
	MainButtonBox,
	LogCardWrapper,
	LogSendTag,
	HeaderBox,
} from '@/utils/public_style';
import WalletDrawer from '@/components/wallet_drawer';
import RecoverDrawer from '@/components/recover_drawer';
import NftDrawer from '@/components/nft_drawer';
import { LoadingProgress } from '@/components/loading/loading_progress';
import { WalletUtil } from '@/utils/wallet_util';
import { TabTableProvider } from '@/context/tabTableContext';
import { useUtilContext } from '@/context/utilContext';
import {
	MainButton,
	MainCard,
	MainCardTypo,
	MainFooterTypo,
	MainIconButton,
	MainInput,
	MainNetworkSelect,
	MainPaper,
	VerticalDivider,
} from '@/components/muiComponents';
import JsonViewer from '@/components/jsonViewer/jsonViewer';
import useWallet from '@/store/useWallet';
import { revealKey } from '@/utils/common';

interface ResultLog {
	code: string;
	gasUsed: number;
	gasWanted: number;
	height: number;
	transactionHash: string;
	rawLog: Record<string, string>;
}

const Video_Background = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export default function Main() {
	const reCaptchaSiteKey = revealKey(import.meta.env.VITE_RECAPTCHA_SITEKEY) || '';
	const explorerUrl = import.meta.env.VITE_EXPLORER_URL || '';

	const { SDK, getWalletBalance, sendTokenFromFaucet } = WalletUtil();

	const walletInfo = useWallet();

	const { alertMessage, alertTimer, alertType, alertOpen, setAlertOpen, isLoading, handleAlertOpen, handleLoadingOpen } = useUtilContext();

	const [openRecaptcha, setOpenRecaptcha] = useState(false);

	const [sendingState, setSendingState] = useState(false);
	const [resultLog, setResultLog] = useState<null | ResultLog>(null);

	const [sendAddressInput, setSendAddressInput] = useState('');

	const NETWORK_NAME = SDK().Config.chainID.split('-')[0] || '-';

	const [network, setNetwork] = useState(NETWORK_NAME);
	const networkData = [NETWORK_NAME];

	const [openWalletDrawer, setOpenWalletDrawer] = useState(false);
	const [openRecoverDrawer, setOpenRecoverDrawer] = useState(false);
	const [openNftDrawer, setOpenNftDrawer] = useState<boolean>(false);

	const moveToExplorer = () => {
		window.open(explorerUrl, '_blank');
	};

	const moveToExplorerTransaction = (hash: string) => {
		window.open(explorerUrl + '/transactions/' + hash, '_blank');
	};

	const handleRecaptcha = (value: string | null) => {
		if (typeof value === 'string') sendAddress();
	};

	const handleAlertClose = (event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlertOpen(false);
	};

	const handleSendAddressInputText = (event: ChangeEvent<HTMLInputElement>) => {
		setSendAddressInput(event.target.value);
	};

	const resetSendAddressInputText = () => {
		setSendAddressInput('');
	};

	const handleOnKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			activateSendProcess();
		}
	};

	const handleNetwork = (event: any) => {
		setNetwork(event.target.value);

		switch (event.target.value) {
			case 'imperium':
				setSendingState(false);
				break;
			default:
				break;
		}
	};

	const activateSendProcess = () => {
		if (sendAddressInput === '') {
			handleAlertOpen('Please fill in Address', 5000, 'error');
			return;
		}

		//? Disable this line to hide ReCaptcha
		setOpenRecaptcha(true);

		//? Enable this line to hide ReCaptcha
		// sendAddress();
	};

	const resetSendStatus = () => {
		resetSendAddressInputText();

		setOpenRecaptcha(false);
		handleLoadingOpen(false);
		setSendingState(false);
	};

	const sendAddress = async () => {
		if (sendingState) return;
		handleLoadingOpen(true);
		setSendingState(true);

		try {
			let result: any = await sendTokenFromFaucet(sendAddressInput);

			// Result code is not 0, it means request is failed with some reason.
			const resultCode = result.code === 0 ? 'Success' : result.code;
			const tmpResult = {
				code: resultCode,
				gasUsed: result.gasUsed,
				gasWanted: result.gasWanted,
				height: result.height,
				transactionHash: result.transactionHash,
				rawLog: result.rawLog,
			};

			try {
				const parsed = JSON.parse(result.rawLog);
				tmpResult.rawLog = parsed;
			} catch (error) {
				console.log('Result rawLog is not json.');
				tmpResult.rawLog = { result: tmpResult.rawLog };
			}

			if (result.code !== 0) {
				handleAlertOpen(result.rawLog, 5000, 'error');
			} else {
				handleAlertClose();
			}

			setResultLog(tmpResult);

			if (walletInfo.walletExist) {
				let balance = await getWalletBalance();
				useWallet.getState().setFCTBalance(balance);
			}

			resetSendStatus();
		} catch (error: any) {
			console.log('[error] ' + error);
			handleAlertOpen(error.message, 5000, 'error');
			resetSendStatus();
		}
	};

	const handleWalletDrawer = (open: boolean) => {
		setOpenWalletDrawer(open);
	};

	const handleRecoverDrawer = (open: boolean) => {
		setOpenRecoverDrawer(open);
	};

	const handleNftDrawer = (open: boolean) => {
		setOpenNftDrawer(open);
	};

	useEffect(() => {
		if (resultLog) {
			setResultLog(null);
		}
	}, [walletInfo.mnemonic, walletInfo.privateKey, walletInfo.walletAddress]);

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
						<MainTitle $banner src="/assets/firma_chain_title.svg" onClick={() => moveToExplorer()} />
						<MainNetworkSelect
							value={network}
							onChange={(e) => handleNetwork(e)}
							style={{ textAlign: 'left', paddingLeft: '12px' }}
							MenuProps={{ disablePortal: true }}
						>
							{networkData.map((network) => {
								return (
									<MenuItem value={network} key={'select-option-' + network}>
										{network}
									</MenuItem>
								);
							})}
						</MainNetworkSelect>
					</HeaderBox>

					<MainBox>
						<MainTitle src="/assets/firma_chain_title.svg" />
						<Wrapper style={{ padding: '10px 0 50px 0' }}>
							<MainPaper>
								<MainInput
									disabled={sendingState}
									placeholder="Address"
									value={sendAddressInput}
									onChange={handleSendAddressInputText}
									onKeyPress={handleOnKeyPress}
								/>
								<VerticalDivider orientation="vertical" />
								<MainIconButton disabled={sendingState} color="primary" onClick={() => activateSendProcess()}>
									<SendIcon />
								</MainIconButton>
							</MainPaper>
						</Wrapper>
						<MainButtonBox>
							<MainButtonWrapper>
								<MainButton variant="contained" onClick={() => setOpenWalletDrawer(true)}>
									wallet
								</MainButton>
								<MainButton variant="contained" onClick={() => setOpenRecoverDrawer(true)}>
									Recover
								</MainButton>
								<MainButton
									disabled={walletInfo.walletAddress === ''}
									variant="contained"
									style={{
										backgroundColor: walletInfo.walletAddress === '' ? '#a0a0a0' : '#e0e0e0',
									}}
									onClick={() => setOpenNftDrawer(true)}
								>
									NFT
								</MainButton>
							</MainButtonWrapper>
						</MainButtonBox>
					</MainBox>

					{openRecaptcha && (
						<ReCaptchaBox>
							<ReCAPTCHA
								style={{ display: 'inline-block', height: '35px' }}
								theme="light"
								sitekey={reCaptchaSiteKey}
								onChange={handleRecaptcha}
							/>
						</ReCaptchaBox>
					)}

					{resultLog && (
						<LogBox>
							<MainCard>
								<CardContent>
									<LogSendTag>{resultLog.code}</LogSendTag>
									<LogCardWrapper>
										<MainCardTypo variant="body2" /*component="p"*/>hash</MainCardTypo>
									</LogCardWrapper>
									<LogCardWrapper>
										<MainCardTypo variant="body2" /*component="p"*/>
											<a
												style={{ color: '#1D86FF', cursor: 'pointer' }}
												onClick={() => moveToExplorerTransaction(resultLog.transactionHash)}
											>
												{resultLog.transactionHash}
											</a>
										</MainCardTypo>
									</LogCardWrapper>
									<Divider />
									<LogCardWrapper>
										<MainCardTypo variant="body2" /*component="p"*/>gasUsed</MainCardTypo>
										<MainCardTypo variant="body2" /*component="p"*/>{resultLog.gasUsed}</MainCardTypo>
									</LogCardWrapper>
									<Divider />
									<LogCardWrapper>
										<MainCardTypo variant="body2" /*component="p"*/>gasWanted</MainCardTypo>
										<MainCardTypo variant="body2" /*component="p"*/>{resultLog.gasWanted}</MainCardTypo>
									</LogCardWrapper>
									<Divider />
									<LogCardWrapper>
										<MainCardTypo variant="body2" /*component="p"*/>rawLog</MainCardTypo>
									</LogCardWrapper>
									<LogCardWrapper>
										<JsonViewer data={resultLog.rawLog} />
									</LogCardWrapper>
								</CardContent>
							</MainCard>
						</LogBox>
					)}
				</ContentsContainer>
				<FooterBox>
					<MainFooterTypo variant="body1">Copyright © FIRMACHAIN 2023</MainFooterTypo>
					<MainFooterTypo variant="body1">
						Maintained By{' '}
						<a style={{ color: '#1D86FF' }} href="https://firmachain.org/">
							FIRMACHAIN
						</a>
					</MainFooterTypo>
				</FooterBox>
			</Container>

			{/* Drawer */}
			<WalletDrawer open={openWalletDrawer} handleWalletDrawer={handleWalletDrawer} />
			<RecoverDrawer open={openRecoverDrawer} handleRecoverDrawer={handleRecoverDrawer} handleWalletDrawer={handleWalletDrawer} />
			{/* {NftState.nftMode && ( */}
			<TabTableProvider>
				<NftDrawer open={openNftDrawer} handleNftDrawer={handleNftDrawer} />
			</TabTableProvider>
			{/* )} */}

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
				<Alert severity={alertType as AlertColor}>{alertMessage}</Alert>
			</Snackbar>

			{/* Loading */}
			<LoadingProgress open={isLoading} />
		</>
	);
}
