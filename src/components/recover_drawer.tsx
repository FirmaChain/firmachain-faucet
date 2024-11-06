import { ClickAwayListener, List, ListItem, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Wrapper } from '../utils/public_style';

import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';

import { WalletInfoActions } from '../redux/actions';

import { WalletUtil } from '../utils/wallet_util';
import { useUtilContext } from '../context/utilContext';
import { DisabledTextField, DrawerButton, StyledButton, StyledDivider, StyledTypo } from './muiComponents';

export default function RecoverDrawer({
	open,
	handleRecoverDrawer,
	handleWalletDrawer,
}: {
	open: boolean;
	handleRecoverDrawer: (v: boolean) => void;
	handleWalletDrawer: (v: boolean) => void;
}) {
	const { recoverWallet } = WalletUtil();

	const { handleAlertOpen } = useUtilContext();

	const DrawerTitle = 'Recover';

	const [mnemonic, setMnemonic] = useState('');
	const [privateKey, setPrivateKey] = useState('');

	const [recovery, setRecovery] = useState(false);

	const closeDrawer = () => {
		handleRecoverDrawer(false);
	};

	const openWalletDrawer = () => {
		handleWalletDrawer(true);
	};

	const onChangeMnemonicInput = (event: ChangeEvent<HTMLInputElement>) => {
		setMnemonic(event.target.value);
	};

	const onChangePrivateKeyInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPrivateKey(event.target.value);
	};

	const walletRecover = async () => {
		if (mnemonic === '' && privateKey === '') {
			handleAlertOpen('Please fill in Mnemonic or Privete key', 5000, 'error');
			return;
		} else {
			try {
				let wallet;
				if (mnemonic !== '') {
					wallet = await recoverWallet(mnemonic, 'mnemonic');
				} else {
					wallet = await recoverWallet(privateKey, 'privatekey');
				}

				WalletInfoActions.setWalletExist(true);

				handleAlertOpen('Recovered your wallet', 3000, 'success');
				setRecovery(false);
				closeDrawer();
				openWalletDrawer();
			} catch (error: any) {
				console.log('[error] ' + error);
				setRecovery(false);
				handleAlertOpen(error.message, 3000, 'error');
			}
		}
	};

	useEffect(() => {
		if (recovery) {
			walletRecover();
		}
	}, [recovery]);

	useEffect(() => {
		if (open) {
			setMnemonic('');
			setPrivateKey('');
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
						<StyledTypo variant="h5">{DrawerTitle}</StyledTypo>
						<CloseIcon style={{ color: '#fff', cursor: 'pointer' }} onClick={() => closeDrawer()} />
					</Wrapper>
					<StyledDivider />
					<List>
						<StyledTypo variant="body2">Mnemonic</StyledTypo>
						<ListItem>
							<DisabledTextField multiline maxRows={5} variant="outlined" onChange={onChangeMnemonicInput} value={mnemonic} />
						</ListItem>

						<StyledTypo variant="body2">Private Key</StyledTypo>
						<ListItem>
							<DisabledTextField variant="outlined" onChange={onChangePrivateKeyInput} value={privateKey} />
						</ListItem>
						<Wrapper>
							<StyledButton variant="contained" onClick={() => setRecovery(true)}>
								Recover
							</StyledButton>
						</Wrapper>
					</List>
				</div>
			</ClickAwayListener>
		</Drawer>
	);
}
