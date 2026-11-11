import { ListItem } from '@mui/material';
import { Wrapper } from '@/utils/public_style';
import { ChangeEvent, useEffect, useState } from 'react';
import { NftUtil } from '@/utils/nft_util';
import { useTabTableContext } from '@/context/tabTableContext';
import { useUtilContext } from '@/context/utilContext';
import { DisabledTextField, StyledButton, StyledTypo, SubTypo } from '../muiComponents';
import useWallet from '@/store/useWallet';
import { WalletUtil } from '@/utils/wallet_util';
import { FirmaUtil } from '@firmachain/firma-js';

const METADATA_EXAMPLE_URL = '/nft-metadata.example.json';

export default function CreateNFTSection({ open }: { open: boolean }) {
	const { newNft } = NftUtil();
	const { SDK } = WalletUtil();
	const { fctBalance } = useWallet();

	const { handleNFTButtons } = useTabTableContext();

	const { handleAlertOpen, handleLoadingOpen } = useUtilContext();

	const [metadataUrl, setMetadataUrl] = useState<string>('');
	const [nftMemo, setNftMemo] = useState<string>('');
	const [metadataExample, setMetadataExample] = useState<string>('');

	const [isMintNFT, setIsMintNFT] = useState(false);

	useEffect(() => {
		let ignore = false;

		fetch(METADATA_EXAMPLE_URL)
			.then((response) => {
				if (!response.ok) throw new Error('Failed to load metadata example.');
				return response.text();
			})
			.then((text) => {
				if (!ignore) setMetadataExample(text.trim());
			})
			.catch(() => {
				if (!ignore) setMetadataExample('');
			});

		return () => {
			ignore = true;
		};
	}, []);

	const onChangeMetadataUrl = (event: ChangeEvent<HTMLInputElement>) => {
		setMetadataUrl(event.target.value);
	};

	const onChangeNftMemo = (event: ChangeEvent<HTMLInputElement>) => {
		setNftMemo(event.target.value);
	};

	const mintNFT = async () => {
		if (metadataUrl.trim() === '') return;

		const defaultFee = FirmaUtil.getFCTStringFromUFCT(SDK().Config.defaultFee);

		if (Number(fctBalance) < Number(defaultFee)) {
			handleAlertOpen('Insufficient funds. Please check your account balance.', 5000, 'error');
			return;
		}

		handleLoadingOpen(true);
		setIsMintNFT(true);
		try {
			await newNft(metadataUrl.trim(), nftMemo);

			handleNFTButtons('list');
			handleAlertOpen('Created new NFT', 3000, 'success');
			handleLoadingOpen(false);
			setIsMintNFT(false);
		} catch (error: any) {
			console.log(error);
			handleAlertOpen(error.message, 5000, 'error');
			handleLoadingOpen(false);
			setIsMintNFT(false);
		}
	};

	return (
		<>
			<StyledTypo variant="body2">Metadata JSON URL</StyledTypo>
			<SubTypo variant="caption">Required fields: name, description, and path.</SubTypo>
			<SubTypo variant="caption">'path' is an image URL.</SubTypo>
			{metadataExample && (
				<pre
					style={{
						margin: '8px 10px 0',
						padding: '8px',
						backgroundColor: '#222',
						color: '#ddd',
						fontSize: '11px',
						lineHeight: 1.4,
						borderRadius: '3px',
						overflowX: 'auto',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-all',
					}}
				>
					{metadataExample}
				</pre>
			)}
			<ListItem>
				<a
					href={METADATA_EXAMPLE_URL}
					download="nft-metadata.example.json"
					style={{ color: 'rgb(29, 134, 255)', fontSize: '13px' }}
				>
					Download example
				</a>
			</ListItem>
			<ListItem>
				<DisabledTextField variant="outlined" onChange={onChangeMetadataUrl} value={metadataUrl} />
			</ListItem>
			<StyledTypo variant="body2">Memo</StyledTypo>
			<ListItem>
				<DisabledTextField multiline maxRows={5} variant="outlined" onChange={onChangeNftMemo} value={nftMemo} />
			</ListItem>
			<Wrapper>
				<StyledButton variant="contained" onClick={() => mintNFT()} disabled={isMintNFT}>
					Create
				</StyledButton>
			</Wrapper>
		</>
	);
}
