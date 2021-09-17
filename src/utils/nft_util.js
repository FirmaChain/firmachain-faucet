import { useSelector } from 'react-redux'
import { WalletUtil } from "./wallet_util";


export function NftUtil() {
    const state = useSelector(state => state.walletInfo);
    const {
        SDK,
        getCurrentWallet,
    } = WalletUtil();

    var firmaSDK = SDK();

    const newNft = async(file, name, desc, memo) => {
        let fileHash = await firmaSDK.Ipfs.addBuffer(file);
        let fileUrl = await firmaSDK.Ipfs.getURLFromHash(fileHash);

        let json = '{\"name\" : \"'+ name +'\", \"description\" : \"'+ desc +'\", \"path\" : \"'+ fileUrl +'\"}';
        let nftJson = await firmaSDK.Ipfs.addJson(json);
        let jsonUrl = await firmaSDK.Ipfs.getURLFromHash(nftJson);
        
        let result = await mintNft(jsonUrl, memo);

        return result;
    }

    const mintNft = async(url, memo) => {
        let wallet = await getCurrentWallet();
        let mint = await firmaSDK.Nft.mint(wallet, url, memo);

        return mint;
    }

    const organizeURI = async() => {

    }

    const nftList = async() => {
        let nfts = await firmaSDK.Nft.getNftItemAllFromAddress(state.walletAddress);

        return nfts;
    }

    const transferNft = async(type, address = '', index, memo) => {
        let wallet = await getCurrentWallet();
        let transfer;
        switch (type) {
            case 'send':
                transfer = await firmaSDK.Nft.transfer(wallet, address, Number(index), memo)
                break;
            case 'burn':
                transfer = await firmaSDK.Nft.burn(wallet, Number(index), memo)
                break;
            default:
                break;
        }

        return transfer;
    }

    const getNftBalance = async() => {
        let balance = await firmaSDK.Nft.getBalanceOf(state.walletAddress);
        return balance
    }

    return {
        newNft,
        nftList,
        getNftBalance,
        transferNft,
    }
}
