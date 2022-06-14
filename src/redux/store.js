import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    whitelist: ['walletInfo'],
    storage
};
  
const enhancedReducer = persistReducer(persistConfig, reducers);
export default createStore(enhancedReducer,  composeWithDevTools(applyMiddleware(thunk)));