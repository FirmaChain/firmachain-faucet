import {FirmaSDK, FirmaConfig} from "@firmachain/firma-js";

import { useSelector } from 'react-redux';
import { WalletInfoActions } from "../redux/actions";

export function WalletUtil() {
    const state = useSelector(state => state.walletInfo);
    var firmaSDK = new FirmaSDK(FirmaConfig.DevNetConfig);

    const newWallet = async() => {
        let wallet = await firmaSDK.Wallet.NewWallet();
        return organizeWallet(wallet);
    }

    const getWallet = async(index) => {
        let wallet = await getCurrentWallet(index);
        
        return organizeWallet(wallet);
    }

    const recoverWallet = async(data, type) => {
        let wallet;
        switch (type) {
            case 'nemonic':
                wallet = await firmaSDK.Wallet.fromMnemoic(data);
                break;
            case 'privatekey':
                wallet = await firmaSDK.Wallet.fromPrivateKey(data);
                break;
            default:
                break;
        }

        return organizeWallet(wallet);
    }

    const organizeWallet = async(wallet) => {
        let _nemonic = await wallet.getMnemoic();
        let _privateKey = await wallet.getPrivateKey();
        let _address = await wallet.getAddress();
        let _balance = await wallet.getBalance();

        WalletInfoActions.setNemonic(_nemonic);
        WalletInfoActions.setPrivateKey(_privateKey);
        WalletInfoActions.setWalletAddress(_address);
        WalletInfoActions.setFctBalance(getFCTStringFromUFCT(_balance));

        const organizedWallet = {
            nemonic: _nemonic,
            privateKey: _privateKey,
            address: _address,
            balance: getFCTStringFromUFCT(_balance),
        }

        return organizedWallet;
    }

    const getCurrentWallet = async(index = 0) => {
        if(state.nemonic !== ''){
            let wallet = await firmaSDK.Wallet.fromMnemoic(state.nemonic, index);
            return wallet;
        } else {
            let wallet = await firmaSDK.Wallet.fromPrivateKey(state.privateKey);
            return wallet;
        }
    }

    const getWalletBalance = async() => {
        let balance = await firmaSDK.Wallet.getBalance(state.walletAddress);
        
        return getFCTStringFromUFCT(balance);
    }

    function getFCTStringFromUFCT(uFctAmount) {
        let number = Number(uFctAmount);
        
        return (number / 1000000).toString();
    }

    const sendToken = async(address, amount) => {
        let wallet = await getCurrentWallet();
        let send = await firmaSDK.Wallet.send(wallet, address, Number(amount));

        return send;
    }

    return {
        newWallet,
        getWallet,
        recoverWallet,
        getCurrentWallet,
        getWalletBalance,
        sendToken,
    }
}
