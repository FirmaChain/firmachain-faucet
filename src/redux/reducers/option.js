const initState ={
    nftMode: true,
    sendMode: true,
    network: 'imperium',
    denom: '',
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "NFT_MODE" : 
        return{
            ...state, 
            nftMode: action.payload,
        }
        case "NETWORK" : 
        return{
            ...state, 
            network: action.payload,
        }
        case "DENOM" : 
        return{
            ...state, 
            denom: action.payload,
        }
        default :
        return state
    }
}

export default reducer;