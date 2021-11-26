const NFT_MODE = "NFT_MODE";
const SEND_MODE = "SEND_MODE";
const NETWORK = "NETWORK";

export const setNftMode = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: NFT_MODE,
            payload: boolean
        })
    }
}

export const setSendMode = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: SEND_MODE,
            payload: boolean
        })
    }
}

export const setNetwork = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: NETWORK,
            payload: boolean
        })
    }
}