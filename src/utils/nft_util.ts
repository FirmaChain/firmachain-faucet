import { WalletUtil } from './wallet_util';
import useWallet from '@/store/useWallet';

export function NftUtil() {
	const walletInfo = useWallet();

	const { SDK, getCurrentWallet } = WalletUtil();

	const newNft = async (file: any, name: string, desc: string, memo: string) => {
		let fileHash = await SDK().Ipfs.addBuffer(file);
		let fileUrl = await SDK().Ipfs.getURLFromHash(fileHash);

		let json = '{"name" : "' + name + '", "description" : "' + desc + '", "path" : "' + fileUrl + '"}'; // eslint:ignre-no-useless-escape
		let nftJson = await SDK().Ipfs.addJson(json);
		let jsonUrl = await SDK().Ipfs.getURLFromHash(nftJson);

		let result = await mintNft(jsonUrl, memo);

		return result;
	};

	const mintNft = async (url: string, memo: string) => {
		let wallet = await getCurrentWallet(walletInfo.accountIndex);
		let mint = await SDK().Nft.mint(wallet, url, { memo: memo });

		return mint;
	};

	const organizeURI = async () => {};

	const nftIdList = async () => {
		let paginationKey = '';
		let nftTotalCount = await SDK()
			.Nft.getNftIdListOfOwner(walletInfo.walletAddress)
			.then((res) => res.pagination.total);
		let cycle = Math.ceil(nftTotalCount / 100);
		let idList: string[] = [];
		for (var i = 0; i < cycle; i++) {
			await SDK()
				.Nft.getNftIdListOfOwner(walletInfo.walletAddress, paginationKey)
				.then((res) => {
					idList.push(...res.nftIdList);
					paginationKey = res.pagination.next_key;
				});
		}

		return idList;
	};

	const getNftItemFromId = async (id: string) => {
		let nft = await SDK().Nft.getNftItem(id);

		return nft;
	};

	const transferNft = async (type: string, address = '', index: string, memo: string, walletIndex: number) => {
		let wallet = await getCurrentWallet(walletIndex);
		let transfer;

		switch (type) {
			case 'send':
				transfer = await SDK().Nft.transfer(wallet, address, index, {
					memo: memo,
				});
				break;
			case 'burn':
				transfer = await SDK().Nft.burn(wallet, index, { memo: memo });
				break;
			default:
				break;
		}

		return transfer;
	};

	const getNftBalance = async () => {
		let balance = await SDK().Nft.getBalanceOf(walletInfo.walletAddress);
		return balance;
	};

	return {
		newNft,
		getNftItemFromId,
		nftIdList,
		getNftBalance,
		transferNft,
	};
}
