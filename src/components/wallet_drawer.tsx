import { ClickAwayListener, SelectChangeEvent, List, ListItem, MenuItem, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Wrapper } from '../utils/public_style';

import { ChangeEvent, useMemo, useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { WalletInfoActions } from '../redux/actions';

import copy from 'copy-to-clipboard';
import { WalletUtil } from '../utils/wallet_util';
import { useUtilContext } from '../context/utilContext';
import { AccountSelect, DisabledTextField, DrawerButton, StyledButton, StyledDivider, StyledTypo } from './muiComponents';

export default function WalletDrawer({ open, handleWalletDrawer }: { open: boolean; handleWalletDrawer: (v: boolean) => void }) {
	const { sendToken, newWallet, getWallet } = WalletUtil();

	const { handleAlertOpen, handleLoadingOpen } = useUtilContext();

	const DrawerTitle = 'Wallet';

	const { walletInfo, option }: any = useSelector((state) => state);

	const [mnemonic, setMnemonic] = useState(walletInfo.mnemonic);
	const [privateKey, setPrivateKey] = useState(walletInfo.privateKey);
	const [address, setAddress] = useState(walletInfo.walletAddress);
	const [accountIndex, setAccountIndex] = useState(walletInfo.accountIndex);
	const [balance, setBalance] = useState(walletInfo.fctBalance);

	const [toAddress, setToAddress] = useState('');
	const [amount, setAmount] = useState('');
	const [memo, setMemo] = useState('');
	const [isSendToken, setIsSendToken] = useState(false);

	const [isCreate, setIsCreate] = useState(false);

	const denom = useMemo(() => {
		let value = '';
		if (option.denom.length > 0) {
			value = option.denom.substr(1, option.denom.length);
		}
		return value;
	}, [option.denom]);

	// Create Account Key index
	var Selectindex = [];
	for (var i = 0; i <= 100; i++) {
		Selectindex.push(i);
	}

	// Account Key index
	const onChangeAccountIndex = (event: SelectChangeEvent<unknown>) => {
		setAccountIndex(event.target.value);
	};

	const onChangeToAddress = (event: ChangeEvent<HTMLInputElement>) => {
		setToAddress(event.target.value);
	};

	const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setAmount(event.target.value);
	};

	const onChangeMemo = (event: ChangeEvent<HTMLInputElement>) => {
		setMemo(event.target.value);
	};

	const setWalletInfo = () => {
		setMnemonic(walletInfo.mnemonic);
		setPrivateKey(walletInfo.privateKey);
		setAddress(walletInfo.walletAddress);
		setBalance(walletInfo.fctBalance);
	};

	const resetSendStatus = () => {
		handleLoadingOpen(false);
		setIsSendToken(false);
		setToAddress('');
		setAmount('');
		setMemo('');
	};

	const handleClipboard = (event: any, label: string) => {
		if (event.target.value === '' || event.target.value === undefined) {
			return;
		}
		copy(event.target.value);
		handleAlertOpen('Coppied ' + label, 3000, 'success');
	};

	const onClickCreateWallet = () => {
		setIsCreate(true);
	};

	const closeDrawer = () => {
		handleWalletDrawer(false);
	};

	async function createWallet() {
		try {
			let wallet = await newWallet();
			setWalletInfo(/*wallet*/);

			handleAlertOpen('Created your wallet', 3000, 'success');
			setIsCreate(false);
		} catch (error: any) {
			console.log('[error] ' + error);
			setIsCreate(false);
			handleAlertOpen(error.message, 5000, 'error');
		}
	}

	async function getWalletData(idx = 0) {
		handleLoadingOpen(true);
		try {
			let wallet = await getWallet(idx);
			setWalletInfo(/*wallet*/);
			handleLoadingOpen(false);
		} catch (error: any) {
			handleLoadingOpen(false);
			console.log('[error] ' + error);
			handleAlertOpen(error.message, 5000, 'error');
		}
	}

	const tokenSend = async () => {
		if (toAddress === '') {
			handleAlertOpen('Please fill in to address', 5000, 'error');
			return;
		}
		if (amount === '') {
			handleAlertOpen('Please fill in amount', 5000, 'error');
			return;
		}

		handleLoadingOpen(true);
		try {
			let send = await sendToken(toAddress, amount, memo);
			let wallet = await getWallet(accountIndex);
			setWalletInfo(/*wallet*/);
			resetSendStatus();
			handleAlertOpen('Send token success', 3000, 'success');
		} catch (error: any) {
			console.log('[error] ' + error);
			resetSendStatus();
			handleAlertOpen(error.message, 5000, 'error');
		}
	};

	useEffect(() => {
		if (isSendToken) {
			tokenSend();
		}
	}, [isSendToken]);

	useEffect(() => {
		WalletInfoActions.setAccountIndex(accountIndex);
	}, [accountIndex]);

	useEffect(() => {
		if (isCreate) {
			createWallet();
		} else {
			if (walletInfo.mnemonic !== '') {
				getWalletData(Number(accountIndex));
			}
		}
	}, [isCreate, accountIndex]);

	useEffect(() => {
		if (open) {
			setWalletInfo();
			setAccountIndex(walletInfo.accountIndex);
		}
	}, [open]);

	return (
		<Drawer anchor={'right'} open={open}>
			<ClickAwayListener onClickAway={closeDrawer}>
				<div
					style={{
						width: '335px',
						height: '100%',
						padding: '20px',
						backgroundColor: '#333',
						zIndex: '0',
						overflowY: 'auto',
					}}
				>
					<Wrapper
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Wrapper
							style={{
								padding: 0,
								display: 'flex',
								justifyContent: 'left',
								alignItems: 'center',
							}}
						>
							<StyledTypo variant="h5">{DrawerTitle}</StyledTypo>
							<RefreshIcon style={{ color: '#fff', cursor: 'pointer' }} onClick={() => getWalletData()} />
						</Wrapper>
						<CloseIcon style={{ color: '#fff', cursor: 'pointer' }} onClick={() => closeDrawer()} />
					</Wrapper>
					<StyledDivider />
					<Wrapper>
						<StyledButton variant="contained" onClick={() => onClickCreateWallet()}>
							Create New Wallet
						</StyledButton>
					</Wrapper>

					<List>
						<StyledTypo variant="body2">Mnemonic</StyledTypo>
						<ListItem>
							<Wrapper drawer>
								<DisabledTextField
									onClick={(e) => handleClipboard(e, 'Mnemonic')}
									multiline
									maxRows={5}
									variant="outlined"
									value={mnemonic}
									disabled
								/>
							</Wrapper>
						</ListItem>
						<StyledTypo variant="body2">Private Key</StyledTypo>
						<ListItem>
							<Wrapper drawer>
								<DisabledTextField
									onClick={(e) => handleClipboard(e, 'Private Key')}
									variant="outlined"
									value={privateKey}
									disabled
								/>
							</Wrapper>
						</ListItem>

						<StyledTypo variant="body2">Wallet Address</StyledTypo>
						<ListItem>
							<DisabledTextField onClick={(e) => handleClipboard(e, 'Wallet Address')} variant="outlined" value={address} disabled />
						</ListItem>

						{walletInfo.mnemonic !== '' && (
							<>
								<ListItem>
									<Wrapper style={{ display: 'flex', justifyContent: 'right' }}>
										<StyledTypo style={{ opacity: '.8' }} variant="body2">
											Select your account index
										</StyledTypo>
										<AccountSelect
											value={Number(accountIndex)}
											onChange={(e) => onChangeAccountIndex(e)}
											MenuProps={{ disablePortal: true }}
										>
											{Selectindex.map((idx) => {
												return (
													<MenuItem value={idx} key={'select-option-' + idx}>
														{idx}
													</MenuItem>
												);
											})}
										</AccountSelect>
									</Wrapper>
								</ListItem>
							</>
						)}
						<StyledDivider />
						<StyledTypo variant="body2">{denom.toUpperCase() + ' Balance'}</StyledTypo>
						<ListItem>
							<Wrapper drawer>
								<DisabledTextField variant="outlined" disabled value={balance + denom} />
							</Wrapper>
						</ListItem>

						<StyledTypo variant="body2">To Address</StyledTypo>
						<ListItem>
							<DisabledTextField variant="outlined" onChange={onChangeToAddress} value={toAddress} />
						</ListItem>
						<StyledTypo variant="body2">Amount</StyledTypo>
						<ListItem>
							<DisabledTextField variant="outlined" onChange={onChangeAmount} value={amount} />
						</ListItem>
						<StyledTypo variant="body2">Memo</StyledTypo>
						<ListItem>
							<DisabledTextField variant="outlined" onChange={onChangeMemo} value={memo} />
						</ListItem>
						<Wrapper>
							<StyledButton variant="contained" onClick={() => setIsSendToken(true)}>
								Send
							</StyledButton>
						</Wrapper>
					</List>
				</div>
			</ClickAwayListener>
		</Drawer>
	);
}
