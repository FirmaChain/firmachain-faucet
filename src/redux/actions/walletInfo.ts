const WALLET_EXIST = 'WALLET_EXIST';
const MNEMONIC = 'MNEMONIC';
const WALLET_ADDRESS = 'WALLET_ADDRESS';
const PRIVATE_KEY = 'PRIVATE_KEY';
const ACCOUNT_INDEX = 'ACCOUNT_INDEX';
const FCT_BALANCE = 'FCT_BALANCE';

export const setWalletExist = (value: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: WALLET_EXIST,
			payload: value,
		});
	};
};

export const setMnemonic = (value: string) => {
	return (dispatch: any) => {
		dispatch({
			type: MNEMONIC,
			payload: value,
		});
	};
};

export const setWalletAddress = (value: string) => {
	return (dispatch: any) => {
		dispatch({
			type: WALLET_ADDRESS,
			payload: value,
		});
	};
};

export const setPrivateKey = (value: string) => {
	return (dispatch: any) => {
		dispatch({
			type: PRIVATE_KEY,
			payload: value,
		});
	};
};

export const setAccountIndex = (value: number) => {
	return (dispatch: any) => {
		dispatch({
			type: ACCOUNT_INDEX,
			payload: value,
		});
	};
};

export const setFctBalance = (value: string) => {
	return (dispatch: any) => {
		dispatch({
			type: FCT_BALANCE,
			payload: value,
		});
	};
};
