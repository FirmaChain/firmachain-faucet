const initState ={
    walletExist: false,
    nemonic: '',
    walletAddress: '',
    privateKey: '',
    accountIndex: '0',
    fctBalance: '0',
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "WALLET_EXIST" : 
        return{
            ...state, 
            walletExist: action.payload,
        }
        case "NEMONIC" : 
        return{
            ...state, 
            nemonic: action.payload,
        }
        case "WALLET_ADDRESS" : 
        return{
            ...state, 
            walletAddress: action.payload,
        }
        case "PRIVATE_KEY" : 
        return{
            ...state, 
            privateKey: action.payload,
        }
        case "ACCOUNT_INDEX" : 
        return{
            ...state, 
            accountIndex: action.payload,
        }
        case "FCT_BALANCE" : 
        return{
            ...state, 
            fctBalance: action.payload,
        }
        default :
        return state
    }
}

export default reducer;