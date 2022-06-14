const NFT_MODE = "NFT_MODE";
const SEND_MODE = "SEND_MODE";
const NETWORK = "NETWORK";
const DENOM = "DENOM";

export const setNftMode = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: NFT_MODE,
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

export const setDemon = (denom) => {
    return (dispatch) => {
        dispatch({
            type: DENOM,
            payload: denom
        })
    }
}