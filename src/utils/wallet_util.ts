import { FirmaSDK, FirmaConfig, FirmaWalletService } from '@firmachain/firma-js';

import { useSelector } from 'react-redux';
import { WalletInfoActions } from '../redux/actions';

const faucetMnemonic = process.env.REACT_APP_FAUCET_MNEMONIC || '';

export function WalletUtil() {
	// const network = useSelector((state: any) => state.option.network);
	const state = useSelector((state: any) => state.walletInfo);
	const SDK = () => {
		return new FirmaSDK(FirmaConfig.TestNetConfig);
	};

	const newWallet = async () => {
		let wallet = await SDK().Wallet.newWallet();
		return organizeWallet(wallet);
	};

	const getWallet = async (index: number) => {
		let wallet = await getCurrentWallet(index);

		return organizeWallet(wallet);
	};

	const recoverWallet = async (data: string, type: string) => {
		let wallet: FirmaWalletService | null = null;
		switch (type) {
			case 'mnemonic':
				wallet = await SDK().Wallet.fromMnemonic(data);
				break;
			case 'privatekey':
				wallet = await SDK().Wallet.fromPrivateKey(data);
				break;
			default:
				break;
		}

		if (wallet === null) {
			throw new Error('Wallet is not connected.');
		}

		return organizeWallet(wallet);
	};

	const organizeWallet = async (wallet: FirmaWalletService) => {
		let _mnemonic = await wallet.getMnemonic();
		let _privateKey = await wallet.getPrivateKey();
		let _address = await wallet.getAddress();
		let _balance = await SDK().Bank.getBalance(_address);

		WalletInfoActions.setMnemonic(_mnemonic);
		WalletInfoActions.setPrivateKey(_privateKey);
		WalletInfoActions.setWalletAddress(_address);
		WalletInfoActions.setFctBalance(getFCTStringFromUFCT(_balance));

		const organizedWallet = {
			mnemonic: _mnemonic,
			privateKey: _privateKey,
			address: _address,
			balance: getFCTStringFromUFCT(_balance),
		};

		return organizedWallet;
	};

	const getCurrentWallet = async (index = 0) => {
		if (state.mnemonic !== '') {
			let wallet = await SDK().Wallet.fromMnemonic(state.mnemonic, index);
			return wallet;
		} else {
			let wallet = await SDK().Wallet.fromPrivateKey(state.privateKey);
			return wallet;
		}
	};

	const getWalletBalance = async () => {
		let balance = await SDK().Bank.getBalance(state.walletAddress);

		return getFCTStringFromUFCT(balance);
	};

	function getFCTStringFromUFCT(uFctAmount: string) {
		let number = Number(uFctAmount);

		return (number / 1000000).toString();
	}

	const sendToken = async (address: string, amount: string, memo?: string) => {
		let wallet = await getCurrentWallet();
		let send = await SDK().Bank.send(wallet, address, Number(amount), {
			memo: memo,
		});

		return send;
	};

	const sendTokenFromFaucet = async (address: string) => {
		let FCTAmount = 1000;
		let memo = 'faucet';

		let faucetWallet = await SDK().Wallet.fromMnemonic(faucetMnemonic);
		let send = await SDK().Bank.send(faucetWallet, address, Number(FCTAmount), {
			memo: memo,
		});

		return send;
	};

	return {
		SDK,
		newWallet,
		getWallet,
		recoverWallet,
		getCurrentWallet,
		getWalletBalance,
		sendToken,
		sendTokenFromFaucet,
	};
}
