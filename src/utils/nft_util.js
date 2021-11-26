import { useSelector } from 'react-redux'
import { WalletUtil } from "./wallet_util";

export function NftUtil() {
    const state = useSelector(state => state.walletInfo);
    const {
        SDK,
        getCurrentWallet,
    } = WalletUtil();

    const newNft = async(file, name, desc, memo) => {
        let fileHash = await SDK().Ipfs.addBuffer(file);
        let fileUrl = await SDK().Ipfs.getURLFromHash(fileHash);

        let json = '{\"name\" : \"'+ name +'\", \"description\" : \"'+ desc +'\", \"path\" : \"'+ fileUrl +'\"}';
        let nftJson = await SDK().Ipfs.addJson(json);
        let jsonUrl = await SDK().Ipfs.getURLFromHash(nftJson);
        
        let result = await mintNft(jsonUrl, memo);

        return result;
    }

    const mintNft = async(url, memo) => {
        let wallet = await getCurrentWallet();
        let mint = await SDK().Nft.mint(wallet, url, {memo: memo});

        return mint;
    }

    const organizeURI = async() => {

    }

    const nftList = async() => {
        let nfts = await SDK().Nft.getNftItemAllFromAddress(state.walletAddress);

        return nfts;
    }

    const transferNft = async(type, address = '', index, memo) => {
        let wallet = await getCurrentWallet();
        let transfer;
        switch (type) {
            case 'send':
                transfer = await SDK().Nft.transfer(wallet, address, Number(index), {memo: memo});
                break;
            case 'burn':
                transfer = await SDK().Nft.burn(wallet, Number(index), {memo: memo})
                break;
            default:
                break;
        }

        return transfer;
    }

    const getNftBalance = async() => {
        let balance = await SDK().Nft.getBalanceOf(state.walletAddress);
        return balance
    }

    return {
        newNft,
        nftList,
        getNftBalance,
        transferNft,
    }
}
