import {FirmaSDK, FirmaConfig} from "@firmachain/firma-js";

import DATA from "../config";

import { useSelector } from 'react-redux';
import { WalletInfoActions } from "../redux/actions";

const firmaSDK = new FirmaSDK(FirmaConfig.DevNetConfig);
const faucetMnemonic = DATA.faucetMnemonic;

export function WalletUtil() {

    const state = useSelector(state => state.walletInfo);
    const SDK = () => {
        return firmaSDK;
    };

    const newWallet = async() => {
        let wallet = await SDK().Wallet.newWallet();
        return organizeWallet(wallet);
    }

    const getWallet = async(index) => {
        let wallet = await getCurrentWallet(index);
        
        return organizeWallet(wallet);
    }

    const recoverWallet = async(data, type) => {
        let wallet;
        switch (type) {
            case 'mnemonic':
                wallet = await SDK().Wallet.fromMnemonic(data);
                break;
            case 'privatekey':
                wallet = await SDK().Wallet.fromPrivateKey(data);
                break;
            default:
                break;
        }

        return organizeWallet(wallet);
    }

    const organizeWallet = async(wallet) => {
        let _mnemonic = await wallet.getMnemonic();
        let _privateKey = await wallet.getPrivateKey();
        let _address = await wallet.getAddress();
        let _balance = await SDK().Bank.getBalance(_address);

        WalletInfoActions.setMnemonic(_mnemonic);
        WalletInfoActions.setPrivateKey(_privateKey);
        WalletInfoActions.setWalletAddress(_address);
        WalletInfoActions.setFctBalance(getFCTStringFromUFCT(_balance));

        const organizedWallet = {
            mnemonic: _mnemonic,
            privateKey: _privateKey,
            address: _address,
            balance: getFCTStringFromUFCT(_balance),
        }

        return organizedWallet;
    }

    const getCurrentWallet = async(index = 0) => {
        if(state.mnemonic !== ''){
            let wallet = await SDK().Wallet.fromMnemonic(state.mnemonic, index);
            return wallet;
        } else {
            let wallet = await SDK().Wallet.fromPrivateKey(state.privateKey);
            return wallet;
        }
    }

    const getWalletBalance = async() => {
        let balance = await SDK().Bank.getBalance(state.walletAddress);
        
        return getFCTStringFromUFCT(balance);
    }

    function getFCTStringFromUFCT(uFctAmount) {
        let number = Number(uFctAmount);
        
        return (number / 1000000).toString();
    }

    const sendToken = async(address, amount, memo) => {
        let wallet = await getCurrentWallet();
        let send = await firmaSDK.Bank.send(wallet, address, Number(amount), {memo: memo});

        return send;
    }

    const sendTokenFromFaucet = async(address) => {
        let FCTAmount = 1000; // 2000fct(테라 기준)
        let memo = 'faucet';

        let faucetWallet = await SDK().Wallet.fromMnemonic(faucetMnemonic);
        let send = await firmaSDK.Bank.send(faucetWallet, address, Number(FCTAmount), {memo: memo});

        return send;
    }

    return {
        SDK,
        newWallet,
        getWallet,
        recoverWallet,
        getCurrentWallet,
        getWalletBalance,
        sendToken,
        sendTokenFromFaucet,
    }
}
