const WALLET_EXIST = "WALLET_EXIST";
const NEMONIC = "NEMONIC";
const WALLET_ADDRESS = "WALLET_ADDRESS";
const PRIVATE_KEY = "PRIVATE_KEY";
const ACCOUNT_INDEX = "ACCOUNT_INDEX";
const FCT_BALANCE = "FCT_BALANCE";

export const setWalletExist = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: WALLET_EXIST,
            payload: boolean
        })
    }
}

export const setNemonic = (string) => {
    return (dispatch) => {
        dispatch({
            type: NEMONIC,
            payload: string
        })
    }
}

export const setWalletAddress = (string) => {
    return (dispatch) => {
        dispatch({
            type: WALLET_ADDRESS,
            payload: string
        })
    }
}

export const setPrivateKey = (string) => {
    return (dispatch) => {
        dispatch({
            type: PRIVATE_KEY,
            payload: string
        })
    }
}

export const setAccountIndex = (index) => {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT_INDEX,
            payload: index
        })
    }
}

export const setFctBalance = (string) => {
    return (dispatch) => {
        dispatch({
            type: FCT_BALANCE,
            payload: string
        })
    }
}
