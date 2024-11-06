import { ListItem } from '@mui/material';

import { Wrapper, NftCardTextBox } from '../../utils/public_style';

import { useState } from 'react';
import { useEffect } from 'react';
import SendNFTSection from './sendNftSection';
import { NftUtil } from '../../utils/nft_util';
import { useUtilContext } from '../../context/utilContext';
import { NftItemType } from '@firmachain/firma-js';
import { StyledDivider, NFTTitleTypo, NFTValueTypo, NFTUriTypo } from '../muiComponents';

interface NftData extends NftItemType {
	index?: number;
	json?: any;
	path?: string;
	open?: boolean;
}

export default function ListNftSection({ open, idList }: { open: boolean; idList: string[] }) {
	const { getNftItemFromId } = NftUtil();

	const { handleLoadingOpen } = useUtilContext();

	const [isFetching, setIsFetching] = useState(false);

	const [nfts, setNfts] = useState<NftData[]>([]);
	const [myNFT, setMyNFT] = useState<NftData[]>([]);

	const organizeNfts = async () => {
		handleLoadingOpen(true);
		let list: NftItemType[] = [];
		for (let i = 0; i < idList.length; i++) {
			try {
				const data = await getNftItemFromId(idList[i]);
				list.push(data);
			} catch (error) {
				console.log('[error] ' + error);
				handleLoadingOpen(false);
			}
		}
		setNfts(list);
	};

	const fetchNFTJson = async () => {
		setIsFetching(true);
		setMyNFT([]);
		for (let i = 0; i < nfts.length; i++) {
			const nft = nfts[i];
			const idx = i;
			let fetchWithTokenURI = true;

			const response = await fetch(nft.tokenURI)
				.then((res) => {
					return res;
				})
				.catch((error) => {
					console.log(error);
					fetchWithTokenURI = false;
					setMyNFT((myNFT) => [
						...myNFT,
						{
							index: idx,
							id: nft.id,
							json: null,
							path: '/assets/file.png',
							open: false,
							owner: '',
							tokenURI: '',
						},
					]);
				});

			if (fetchWithTokenURI) {
				try {
					const jsonData = await response!.json();
					const path = await checkImageFile(jsonData.path);

					setMyNFT((myNFT) => [
						...myNFT,
						{
							index: idx,
							id: nft.id,
							json: jsonData,
							path: path,
							open: false,
							owner: '',
							tokenURI: '',
						},
					]);
					setIsFetching(false);
				} catch (error) {
					setIsFetching(false);
					handleLoadingOpen(false);
					console.log('[error] ' + error);
				}
			}
		}
	};

	const checkImageFile = async (path: string) => {
		try {
			const file_res = await fetch(path);
			const file_blob = await file_res.blob();
			return file_blob.type.includes('image') ? path : '/assets/file.png';
		} catch (error) {
			return '/assets/file.png';
		}
	};

	const openSendSection = (index: number) => {
		setMyNFT(myNFT.map((nft) => (nft.index === index ? { ...nft, open: !nft.open } : { ...nft, open: false })));
	};

	const openTokenURI = (uri: string) => {
		window.open(uri, '_blank');
	};

	useEffect(() => {
		organizeNfts();
	}, [idList]);

	useEffect(() => {
		fetchNFTJson();
	}, [nfts]);

	useEffect(() => {
		if (myNFT.length === idList.length) handleLoadingOpen(false);
	}, [myNFT]);

	return (
		<>
			<input type="file" id="fileInput" style={{ display: 'none' }} />
			{!isFetching && myNFT.length === nfts.length && (
				<>
					{myNFT.map((nft: NftData, index: number) => {
						let toeken_uri = nfts[index].tokenURI.split('https://')[1];
						return (
							<div key={'nft-info-' + index}>
								<ListItem>
									<Wrapper style={{ backgroundColor: '#444', borderRadius: '3px' }}>
										<Wrapper
											style={{
												width: '100%',
												display: 'flex',
												justifyContent: 'space-around',
												cursor: 'pointer',
												padding: '0',
											}}
											onClick={() => openSendSection(index)}
										>
											{nft.path && (
												<Wrapper style={{ padding: '17px 0' }}>
													<img style={{ width: '65px', objectFit: 'contain' }} src={nft.path} alt="nft_image" />
												</Wrapper>
											)}
											<Wrapper
												style={{
													width: '200px',
													textAlign: 'left',
													padding: '10px 0 0 0',
												}}
											>
												<NftCardTextBox>
													<NFTTitleTypo variant="caption">ID :</NFTTitleTypo>
													<NFTValueTypo variant="body1">{nft.id}</NFTValueTypo>
												</NftCardTextBox>
												{nft.json && (
													<>
														<NftCardTextBox>
															<NFTTitleTypo variant="caption">NAME :</NFTTitleTypo>
															<NFTValueTypo variant="body1">{nft.json.name}</NFTValueTypo>
														</NftCardTextBox>
														<NftCardTextBox>
															<NFTTitleTypo variant="caption">DESC :</NFTTitleTypo>
															<NFTValueTypo variant="body1">{nft.json.description}</NFTValueTypo>
														</NftCardTextBox>
													</>
												)}
											</Wrapper>
										</Wrapper>
										<Wrapper
											style={{
												float: 'right',
												width: '200px',
												textAlign: 'left',
											}}
										>
											<NftCardTextBox>
												<NFTTitleTypo variant="caption">URI :</NFTTitleTypo>
												<NFTUriTypo variant="body1" onClick={() => openTokenURI(nfts[index].tokenURI)}>
													{toeken_uri}
												</NFTUriTypo>
											</NftCardTextBox>
										</Wrapper>
									</Wrapper>
								</ListItem>
								{nft.open && (
									<>
										<SendNFTSection id={nft.id} />
										<StyledDivider />
									</>
								)}
							</div>
						);
					})}
				</>
			)}
		</>
	);
}
