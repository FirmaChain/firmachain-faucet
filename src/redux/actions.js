import { bindActionCreators } from "redux";
import store from './store';

// import actions
import * as walletInfo from "./actions/walletInfo";

const {dispatch} = store;

// export actions
export const WalletInfoActions = bindActionCreators(walletInfo, dispatch);