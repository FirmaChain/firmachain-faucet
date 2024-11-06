import { ClickAwayListener, List, ListItem, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Wrapper } from '../utils/public_style';

import { useMemo } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import ListNFTSection from './nft/listNftSection';
import CreateNFTSection from './nft/createNftSection';

import copy from 'copy-to-clipboard';
import { useTabTableContext } from '../context/tabTableContext';
import { useUtilContext } from '../context/utilContext';
import { DisabledTextField, StyledButton, StyledDivider, StyledTypo } from './muiComponents';

export default function NftDrawer({ open, handleNftDrawer }: { open: boolean; handleNftDrawer: (v: boolean) => void }) {
	const { openListNFT, setOpenListNFT, openCreateNFT, setOpenCreateNFT, NFTIdList, getBalance, handleNFTButtons, getAllNFTInfo } =
		useTabTableContext();

	const { handleAlertOpen } = useUtilContext();

	const DrawerTitle = 'NFT';

	const { walletInfo, option }: any = useSelector((state) => state);

	const denom = useMemo(() => {
		let value = '';
		if (option.denom.length > 0) {
			value = option.denom.substr(1, option.denom.length);
		}
		return value;
	}, [option.denom]);

	const handleClipboard = (event: any, label: string) => {
		if (event.target.value === '' || event.target.value === undefined) {
			return;
		}
		copy(event.target.value);
		handleAlertOpen('Coppied ' + label, 3000, 'success');
	};

	const closeDrawer = () => {
		handleNftDrawer(false);
	};

	useEffect(() => {
		if (openListNFT) {
			getAllNFTInfo();
		}
	}, [openListNFT]);

	useEffect(() => {
		if (open) {
			setOpenCreateNFT(false);
			setOpenListNFT(true);
		} else {
			setOpenCreateNFT(false);
			setOpenListNFT(false);
		}
	}, [open]);

	return (
		<Drawer anchor={'right'} open={open}>
			<ClickAwayListener onClickAway={closeDrawer}>
				<div
					style={{
						width: '335px',
						height: '100%',
						padding: '20px',
						backgroundColor: '#333',
						zIndex: '0',
						overflowY: 'auto',
					}}
				>
					<Wrapper
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Wrapper
							style={{
								padding: 0,
								display: 'flex',
								justifyContent: 'left',
								alignItems: 'center',
							}}
						>
							<StyledTypo variant="h5">{DrawerTitle}</StyledTypo>

							<RefreshIcon style={{ color: '#fff', cursor: 'pointer' }} onClick={() => getBalance()} />
						</Wrapper>

						<CloseIcon style={{ color: '#fff', cursor: 'pointer' }} onClick={() => closeDrawer()} />
					</Wrapper>
					<StyledDivider />
					<List>
						<StyledTypo variant="body2">Wallet Address</StyledTypo>
						<ListItem>
							<DisabledTextField
								onClick={(e: any) => handleClipboard(e, 'Wallet Address')}
								variant="outlined"
								value={walletInfo.walletAddress}
								disabled
							/>
						</ListItem>
						<StyledTypo variant="body2">{denom.toUpperCase() + ' Balance'}</StyledTypo>
						<ListItem>
							<Wrapper drawer>
								<DisabledTextField variant="outlined" disabled value={walletInfo.fctBalance + denom} />
							</Wrapper>
						</ListItem>
						<StyledDivider />
						<Wrapper style={{ display: NFTIdList.length > 0 ? 'flex' : 'block' }}>
							{NFTIdList.length > 0 && (
								<StyledButton variant="contained" onClick={() => handleNFTButtons('list')}>
									List
								</StyledButton>
							)}
							<StyledButton variant="contained" onClick={() => handleNFTButtons('create')}>
								Create
							</StyledButton>
						</Wrapper>

						{/* <TabNFTContext.Provider value={{ handleNFTButtons, getAllNFTInfo }}> */}
						{/* LIST SECTION */}
						{openListNFT && NFTIdList.length > 0 && <ListNFTSection open={openListNFT} idList={NFTIdList} />}

						{/* CREATE SECTION */}
						{openCreateNFT && <CreateNFTSection open={openCreateNFT} />}
						{/* </TabNFTContext.Provider> */}
					</List>
				</div>
			</ClickAwayListener>
		</Drawer>
	);
}
