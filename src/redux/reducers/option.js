const initState ={
    nftMode: true,
    sendMode: true,
    network: 'imperium',
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "NFT_MODE" : 
        return{
            ...state, 
            nftMode: action.payload,
        }
        case "SEND_MODE" : 
        return{
            ...state, 
            sendMode: action.payload,
        }
        case "NETWORK" : 
        return{
            ...state, 
            network: action.payload,
        }
        default :
        return state
    }
}

export default reducer;