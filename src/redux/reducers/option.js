const initState ={
    nftMode: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "NFT_MODE" : 
        return{
            ...state, 
            nftMode: action.payload,
        }
        default :
        return state
    }
}

export default reducer;