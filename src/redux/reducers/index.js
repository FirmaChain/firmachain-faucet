import { combineReducers } from "redux";
import WalletInfo from './walletInfo';
import Option from './option';

const reducers = combineReducers({
    walletInfo: WalletInfo,
    option: Option,
});

export default (state, action) => {
    return reducers(state, action)
}