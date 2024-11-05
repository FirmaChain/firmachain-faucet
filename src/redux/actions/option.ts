const NFT_MODE = 'NFT_MODE';
const SEND_MODE = 'SEND_MODE';
const NETWORK = 'NETWORK';
const DENOM = 'DENOM';

export const setNftMode = (value: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: NFT_MODE,
			payload: value,
		});
	};
};

export const setNetwork = (value: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: NETWORK,
			payload: value,
		});
	};
};

export const setDemon = (denom: string) => {
	return (dispatch: any) => {
		dispatch({
			type: DENOM,
			payload: denom,
		});
	};
};
