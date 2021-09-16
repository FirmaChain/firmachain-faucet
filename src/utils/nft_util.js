import {FirmaSDK, FirmaConfig} from "@firmachain/firma-js";
import { useSelector } from 'react-redux'
import { WalletUtil } from "./wallet_util";

export function NftUtil() {
    const {
        getCurrentWallet,
    } = WalletUtil();

    const state = useSelector(state => state.walletInfo);
    var firmaSDK = new FirmaSDK(FirmaConfig.DevNetConfig);

    const newNft = async(uri) => {
        let wallet = await getCurrentWallet();
        let nft = await firmaSDK.NFT.mint(wallet, uri);

        return nft;
    }

    const transferNft = async(type, address = '', index) => {
        let wallet = await getCurrentWallet();
        let transfer;
        switch (type) {
            case 'send':
                transfer = await firmaSDK.NFT.transfer(wallet, address, Number(index))
                break;
            case 'burn':
                transfer = await firmaSDK.NFT.burn(wallet, Number(index))
                break;
            default:
                break;
        }

        return transfer;
    }

    const getNftBalance = async() => {
        let balance = await firmaSDK.NFT.getBalanceOf(state.walletAddress);
        return balance
    }

    return {
        newNft,
        getNftBalance,
        transferNft,
    }
}
