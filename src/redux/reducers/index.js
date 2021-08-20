import { combineReducers } from "redux";
import WalletInfo from './walletInfo';

const reducers = combineReducers({
    walletInfo: WalletInfo,
});

export default (state, action) => {
    return reducers(state, action)
}