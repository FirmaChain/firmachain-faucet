import { FirmaConfig, FirmaSDK, FirmaWalletService } from '@firmachain/firma-js';
import useWallet from '@/store/useWallet';

const faucetMnemonic = process.env.REACT_APP_FAUCET_MNEMONIC || '';

export function WalletUtil() {
	const walletInfo = useWallet();

	const SDK = () => {
		return new FirmaSDK(FirmaConfig.TestNetConfig);
	};

	const newWallet = async () => {
		const wallet = await SDK().Wallet.newWallet();
		return organizeWallet(wallet);
	};

	const getWallet = async (index: number) => {
		const wallet = await getCurrentWallet(index);

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
		const _mnemonic = await wallet.getMnemonic();
		const _privateKey = await wallet.getPrivateKey();
		const _address = await wallet.getAddress();
		const _balance = await SDK().Bank.getBalance(_address);

		useWallet.getState().setMnemonic(_mnemonic);
		useWallet.getState().setPrivateKey(_privateKey);
		useWallet.getState().setWalletAddress(_address);
		useWallet.getState().setFCTBalance(getFCTStringFromUFCT(_balance));

		const organizedWallet = {
			mnemonic: _mnemonic,
			privateKey: _privateKey,
			address: _address,
			balance: getFCTStringFromUFCT(_balance),
		};

		return organizedWallet;
	};

	const getCurrentWallet = async (index: number) => {
		if (walletInfo.mnemonic !== '') {
			const wallet = await SDK().Wallet.fromMnemonic(walletInfo.mnemonic, index);
			console.log(await wallet.getAddress());

			return wallet;
		} else {
			const wallet = await SDK().Wallet.fromPrivateKey(walletInfo.privateKey);
			return wallet;
		}
	};

	const getWalletBalance = async () => {
		const balance = await SDK().Bank.getBalance(walletInfo.walletAddress);

		return getFCTStringFromUFCT(balance);
	};

	function getFCTStringFromUFCT(uFctAmount: string) {
		const number = Number(uFctAmount);

		return (number / 1000000).toString();
	}

	const sendToken = async (address: string, amount: string, memo: string, walletIndex: number) => {
		const wallet = await getCurrentWallet(walletIndex);
		const send = await SDK().Bank.send(wallet, address, Number(amount), {
			memo: memo,
		});

		return send;
	};

	const sendTokenFromFaucet = async (address: string) => {
		const FCTAmount = 1000;
		const memo = 'faucet';

		const faucetWallet = await SDK().Wallet.fromMnemonic(faucetMnemonic);
		const send = await SDK().Bank.send(faucetWallet, address, Number(FCTAmount), {
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
