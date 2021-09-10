const NFT_MODE = "NFT_MODE";

export const setNftMode = (boolean) => {
    return (dispatch) => {
        dispatch({
            type: NFT_MODE,
            payload: boolean
        })
    }
}