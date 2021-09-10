import { bindActionCreators } from "redux";
import store from './store';

// import actions
import * as walletInfo from "./actions/walletInfo";
import * as option from "./actions/option";

const {dispatch} = store;

// export actions
export const WalletInfoActions = bindActionCreators(walletInfo, dispatch);
export const OptionActions = bindActionCreators(option, dispatch);