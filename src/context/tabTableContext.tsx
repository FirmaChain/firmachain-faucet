import { createContext, useContext, ReactNode, useState } from 'react';
import { NftUtil } from '@/utils/nft_util';
import { WalletUtil } from '@/utils/wallet_util';
import { useUtilContext } from './utilContext';
import useWallet from '@/store/useWallet';

interface TabTableContextProps {
	openListNFT: boolean;
	setOpenListNFT: (v: boolean) => void;

	openCreateNFT: boolean;
	setOpenCreateNFT: (v: boolean) => void;

	NFTIdList: string[];
	setNFTIdList: (v: string[]) => void;

	getBalance: () => void;

	handleNFTButtons: (v: string) => void;
	getAllNFTInfo: () => void;
}

const TabTableContext = createContext<TabTableContextProps | undefined>(undefined);

export const useTabTableContext = () => {
	const context = useContext(TabTableContext);
	if (!context) {
		throw new Error('useTabTableContext must be used within a TabTableProvider');
	}
	return context;
};

export const TabTableProvider = ({ children }: { children: ReactNode }) => {
	const [openListNFT, setOpenListNFT] = useState(false);
	const [openCreateNFT, setOpenCreateNFT] = useState(true);
	const [NFTIdList, setNFTIdList] = useState<string[]>([]);

	const { nftIdList } = NftUtil();
	const { getWalletBalance } = WalletUtil();
	const { handleLoadingOpen } = useUtilContext();

	const handleNFTButtons = (target: string) => {
		setOpenCreateNFT(target === 'create');
		setOpenListNFT(target === 'list');
	};

	const getBalance = async () => {
		try {
			let _balance = await getWalletBalance();

			useWallet.getState().setFCTBalance(_balance);
		} catch (error) {
			console.log('[error] ' + error);
		}
	};

	const getAllNFTInfo = async () => {
		handleLoadingOpen(true);
		try {
			await nftIdList().then((res) => setNFTIdList(res));

			getBalance();
			handleLoadingOpen(false);
		} catch (error) {
			console.log('[error] ' + error);
			handleLoadingOpen(false);
		}
	};

	return (
		<TabTableContext.Provider
			value={{
				openListNFT,
				setOpenListNFT,

				openCreateNFT,
				setOpenCreateNFT,

				NFTIdList,
				setNFTIdList,

				getBalance,

				handleNFTButtons,
				getAllNFTInfo,
			}}
		>
			{children}
		</TabTableContext.Provider>
	);
};
