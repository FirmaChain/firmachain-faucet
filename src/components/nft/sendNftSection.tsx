import { ListItem } from '@mui/material';
import { Wrapper } from '@/utils/public_style';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { NftUtil } from '@/utils/nft_util';
import { useTabTableContext } from '@/context/tabTableContext';
import { useUtilContext } from '@/context/utilContext';
import { DisabledTextField, StyledButton, StyledTypo } from '../muiComponents';
import useWallet from '@/store/useWallet';

export default function SendNFTSection({ id }: { id: string }) {
	const { getAllNFTInfo } = useTabTableContext();
	const walletInfo = useWallet();

	const { transferNft } = NftUtil();

	const { handleAlertOpen, handleLoadingOpen } = useUtilContext();

	const [toAddress, setToAddress] = useState('');
	const [memo, setMemo] = useState('');

	const [isSendNFT, setIsSendNFT] = useState(false);
	const [isBurnNFT, setIsBurnNFT] = useState(false);

	const NftIdIndex = id;

	const onChangeToAddress = (event: ChangeEvent<HTMLInputElement>) => {
		setToAddress(event.target.value);
	};

	const onChangeMemo = (event: ChangeEvent<HTMLInputElement>) => {
		setMemo(event.target.value);
	};

	const resetTransferStatus = () => {
		setIsSendNFT(false);
		setIsBurnNFT(false);
		handleLoadingOpen(false);
	};

	const NFTTransfer = async () => {
		handleLoadingOpen(true);
		try {
			let transfer = await transferNft(isSendNFT ? 'send' : 'burn', isSendNFT ? toAddress : '', NftIdIndex, memo, walletInfo.accountIndex);

			getAllNFTInfo();
			resetTransferStatus();
			handleAlertOpen(isSendNFT ? 'Transfer NFT success' : 'Burned NFT', 3000, 'success');
		} catch (error: any) {
			resetTransferStatus();
			handleAlertOpen(error.message, 3000, 'error');
			console.log('[error] ' + error);
		}
	};

	useEffect(() => {
		if (isSendNFT || isBurnNFT) NFTTransfer();
	}, [isSendNFT, isBurnNFT]);

	return (
		<>
			<StyledTypo variant="body2">To Address</StyledTypo>
			<ListItem>
				<DisabledTextField variant="outlined" onChange={onChangeToAddress} value={toAddress} />
			</ListItem>
			<StyledTypo variant="body2">Memo</StyledTypo>
			<ListItem>
				<DisabledTextField variant="outlined" onChange={onChangeMemo} value={memo} />
			</ListItem>
			<Wrapper>
				<StyledButton variant="contained" disabled={isSendNFT || isBurnNFT} onClick={() => setIsSendNFT(true)}>
					Send
				</StyledButton>
			</Wrapper>

			<Wrapper>
				<StyledButton variant="contained" disabled={isSendNFT || isBurnNFT} onClick={() => setIsBurnNFT(true)}>
					Burn
				</StyledButton>
			</Wrapper>
		</>
	);
}
