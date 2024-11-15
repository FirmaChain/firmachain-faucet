import { IconButton, ListItem } from '@mui/material';
import FileIcon from '@mui/icons-material/AttachFile';
import { Wrapper } from '@/utils/public_style';
import { ChangeEvent, useState } from 'react';
import { NftUtil } from '@/utils/nft_util';
import { useTabTableContext } from '@/context/tabTableContext';
import { useUtilContext } from '@/context/utilContext';
import { AttachTextField, DisabledTextField, SectionPaper, StyledButton, StyledTypo, SubTypo, VerticalDivider } from '../muiComponents';
import useWallet from '@/store/useWallet';
import { WalletUtil } from '@/utils/wallet_util';
import { FirmaUtil } from '@firmachain/firma-js';

export default function CreateNFTSection({ open }: { open: boolean }) {
	const { newNft } = NftUtil();
	const { SDK } = WalletUtil();
	const { fctBalance } = useWallet();

	const { handleNFTButtons } = useTabTableContext();

	const { handleAlertOpen, handleLoadingOpen } = useUtilContext();

	const [nftFile, setNftFile] = useState<ArrayBuffer | null>(null);
	const [nftFileName, setNftFileName] = useState<string>('');
	const [nftFileSize, setNftFileSize] = useState<string>('');

	const [nftName, setNftName] = useState<string>('');
	const [nftDesc, setNftDesc] = useState<string>('');
	const [nftMemo, setNftMemo] = useState<string>('');

	const [isMintNFT, setIsMintNFT] = useState(false);

	const onChangeNftName = (event: ChangeEvent<HTMLInputElement>) => {
		setNftName(event.target.value);
	};

	const onChangeNftDesc = (event: ChangeEvent<HTMLInputElement>) => {
		setNftDesc(event.target.value);
	};

	const onChangeNftMemo = (event: ChangeEvent<HTMLInputElement>) => {
		setNftMemo(event.target.value);
	};

	const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const reader = new FileReader();

		const file = event.target.files ? event.target.files[0] : undefined;

		if (file === undefined) return;

		reader.readAsArrayBuffer(file);

		reader.onload = function () {
			if (file) {
				if (file.size / 1024 / 1024 > 20) {
					// file limit
					handleAlertOpen('File size exceeds the allowable limit of 20MB', 3000, 'error');
					return;
				}

				setNftFileSize((file.size / 1024 / 1024).toFixed(2));
				setNftFileName(file.name);

				setNftFile(reader.result as ArrayBuffer);
			}
		};

		reader.onerror = function () {
			console.log(reader.error);
		};
	};

	const mintNFT = async () => {
		if (nftFile === null || nftName === '' || nftDesc === '') return;

		const defaultFee = FirmaUtil.getFCTStringFromUFCT(SDK().Config.defaultFee);

		if (Number(fctBalance) < Number(defaultFee)) {
			handleAlertOpen('Insufficient funds. Please check your account balance.', 5000, 'error');
			return;
		}

		handleLoadingOpen(true);
		setIsMintNFT(true);
		try {
			let result = await newNft(nftFile, replaceTextData(nftName), replaceTextData(nftDesc), nftMemo);

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

	const replaceTextData = (text: string) => {
		let inputText = text.replace('\n', '\\n');
		return inputText;
	};

	return (
		<>
			<StyledTypo variant="body2">Attach Image File</StyledTypo>
			<ListItem>
				<SectionPaper>
					<AttachTextField disabled value={nftFileName + (nftFileName && ` (${nftFileSize} MB)`)} />
					<VerticalDivider orientation="vertical" />
					<IconButton color="primary" component="label">
						<FileIcon />
						<input
							id={'ntf_file_input'}
							style={{ display: 'none' }}
							type="file"
							name="imageFile"
							accept="image/*"
							onChange={fileChangedHandler}
						/>
					</IconButton>
				</SectionPaper>
			</ListItem>
			<SubTypo variant="body2">(Maximum file size : 20MB)</SubTypo>
			<StyledTypo variant="body2">Name</StyledTypo>
			<ListItem>
				<DisabledTextField variant="outlined" onChange={onChangeNftName} value={nftName} />
			</ListItem>
			<StyledTypo variant="body2">Description</StyledTypo>
			<ListItem>
				<DisabledTextField multiline maxRows={5} variant="outlined" onChange={onChangeNftDesc} value={nftDesc} />
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
