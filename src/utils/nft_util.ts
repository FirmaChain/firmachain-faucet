import { WalletUtil } from './wallet_util';
import useWallet from '@/store/useWallet';

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

type NftMetadata = {
	name: string;
	description: string;
	path: string;
};

const isHttpUrl = (value: string) => {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};

const isNftMetadata = (value: unknown): value is NftMetadata => {
	if (typeof value !== 'object' || value === null) return false;

	const metadata = value as Record<string, unknown>;
	return (
		typeof metadata.name === 'string' &&
		metadata.name.trim() !== '' &&
		typeof metadata.description === 'string' &&
		metadata.description.trim() !== '' &&
		typeof metadata.path === 'string' &&
		isHttpUrl(metadata.path)
	);
};

const fetchMetadata = async (metadataUrl: string): Promise<NftMetadata> => {
	if (!isHttpUrl(metadataUrl)) {
		throw new Error('Metadata URL must be an http or https URL.');
	}

	let response: Response;
	try {
		response = await fetch(metadataUrl);
	} catch {
		throw new Error('Failed to fetch metadata JSON.');
	}

	if (!response.ok) {
		throw new Error('Failed to fetch metadata JSON.');
	}

	let metadata: unknown;
	try {
		metadata = await response.json();
	} catch {
		throw new Error('Metadata URL did not return valid JSON.');
	}

	if (!isNftMetadata(metadata)) {
		throw new Error('Metadata JSON must include non-empty name, description, and an http(s) image path.');
	}

	return metadata;
};

const validateMetadataImage = async (imageUrl: string) => {
	let response: Response;
	try {
		response = await fetch(imageUrl);
	} catch {
		throw new Error('Failed to fetch the image from metadata path.');
	}

	if (!response.ok) {
		throw new Error('Failed to fetch the image from metadata path.');
	}

	const blob = await response.blob();
	const contentType = response.headers.get('content-type') ?? blob.type;
	if (!contentType.includes('image')) {
		throw new Error('Metadata path must point to an image file.');
	}

	if (blob.size > MAX_IMAGE_BYTES) {
		throw new Error('Image file must be 20MB or smaller.');
	}
};

export function NftUtil() {
	const walletInfo = useWallet();

	const { SDK, getCurrentWallet } = WalletUtil();

	const newNft = async (metadataUrl: string, memo: string) => {
		const metadata = await fetchMetadata(metadataUrl);
		await validateMetadataImage(metadata.path);

		const result = await mintNft(metadataUrl, memo);

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
