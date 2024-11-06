import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface WalletStore {
	walletExist: boolean;
	mnemonic: string;
	walletAddress: string;
	privateKey: string;
	accountIndex: number;
	fctBalance: string;

	setWalletExist: (v: boolean) => void;
	setMnemonic: (v: string) => void;
	setWalletAddress: (v: string) => void;
	setPrivateKey: (v: string) => void;
	setAccountIndex: (v: number) => void;
	setFCTBalance: (v: string) => void;
}

const useWallet = create<WalletStore>()(
	persist(
		immer((set) => ({
			walletExist: false,
			mnemonic: '',
			walletAddress: '',
			privateKey: '',
			accountIndex: 0,
			fctBalance: '0',

			setWalletExist: (v: boolean) =>
				set((state) => {
					state.walletExist = v;
				}),
			setMnemonic: (v: string) =>
				set((state) => {
					state.mnemonic = v;
				}),
			setWalletAddress: (v: string) =>
				set((state) => {
					state.walletAddress = v;
				}),
			setPrivateKey: (v: string) =>
				set((state) => {
					state.privateKey = v;
				}),
			setAccountIndex: (v: number) =>
				set((state) => {
					state.accountIndex = v;
				}),
			setFCTBalance: (v: string) =>
				set((state) => {
					state.fctBalance = v;
				}),
		})),
		{
			name: `firmachain-faucet-wallet`,
			partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['balance'].includes(key.toLowerCase()))),
		},
	),
);

export default useWallet;
