import axios from 'axios';
import { WalletUtil } from './wallet_util';
import useWallet from '@/store/useWallet';
import { FirmaUtil } from '@firmachain/firma-js';

export function NftUtil() {
	const walletInfo = useWallet();

	const { SDK, getCurrentWallet } = WalletUtil();

	const customAddBuffer = async (buffer: ArrayBuffer): Promise<string> => {
		try {
			var bodyData = new FormData();
			bodyData.append('buffer', new Blob([buffer]));

			const response = await axios.request({
				url: SDK().Config.ipfsNodeAddress + ':' + SDK().Config.ipfsNodePort + '/api/v0/add',
				method: 'POST',
				headers: { 'Content-Type': 'multipart/form-data' },
				data: bodyData,
			});

			return response.data.Hash;
		} catch (error) {
			FirmaUtil.printLog(error);
			throw error;
		}
	};

	const newNft = async (file: ArrayBuffer, name: string, desc: string, memo: string) => {
		const fileHash = await customAddBuffer(file);

		const fileUrl = await SDK().Ipfs.getURLFromHash(fileHash);

		let json = '{"name" : "' + name + '", "description" : "' + desc + '", "path" : "' + fileUrl + '"}'; // eslint:ignre-no-useless-escape
		const nftJson = await SDK().Ipfs.addJson(json);
		const jsonUrl = await SDK().Ipfs.getURLFromHash(nftJson);

		const result = await mintNft(jsonUrl, memo);

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
