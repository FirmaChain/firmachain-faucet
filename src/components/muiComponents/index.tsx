import { Button, Card, Divider, IconButton, InputBase, Paper, Select, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const SectionPaper = styled(Paper)({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: '50px',
});

export const MainPaper = styled(Paper)({
	padding: '2px 4px',
	display: 'flex',
	alignItems: 'center',
	width: '40%',
	height: '50px',
	minWidth: '350px',
	maxWidth: '500px',
});

export const StyledDivider = styled(Divider)({
	backgroundColor: '#FFFFFF !important',
});

export const VerticalDivider = styled(Divider)({
	maxHeight: 28,
	margin: '4px !important',
});

export const DisabledTextField = styled(TextField)({
	width: '100%',
	backgroundColor: '#fff',
	borderRadius: '3px',
});

export const AttachTextField = styled(InputBase)({
	fontSize: '12px',
	width: '100%',
	padding: '0 10px',
});

export const StyledTypo = styled(Typography)({
	padding: '10px',
	color: '#fff',
	['@media (max-width: 770px)']: {
		wordBreak: 'break-all',
	},
});

export const StyledButton = styled(Button)({
	backgroundColor: '#fff !important',
	width: '90%',
	padding: '10px !important',
	margin: '0 5px !important',
	color: '#000000',
});

export const DrawerButton = styled(Button)({
	backgroundColor: '#fff',
	width: '90%',
	padding: '10px',
	color: '#000000',
});

export const AccountSelect = styled(Select)({
	backgroundColor: '#fff',
	borderRadius: '3px',
	width: '80px',
	'& .MuiSelect-select': {
		padding: '0',
	},

	'& .MuiPaper-rounded': {
		marginTop: '10px',
		maxHeight: '250px',
	},
});

export const SubTypo = styled(Typography)({
	padding: '0 10px 0 18px',
	color: '#888',
	['@media (max-width: 770px)']: {
		wordBreak: 'break-all',
	},
});

export const NFTTitleTypo = styled(Typography)({
	width: '50px',
	color: '#fff',
	opacity: '.8',
	textAlign: 'left',
});

export const NFTValueTypo = styled(Typography)({
	width: '140px',
	color: '#fff',
	textAlign: 'left',
	paddingRight: '10px',
	wordBreak: 'break-word',
});

export const NFTUriTypo = styled(Typography)({
	width: '140px',
	textAlign: 'left',
	paddingRight: '10px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	cursor: 'pointer',
	color: 'rgb(29, 134, 255)',
	textDecoration: 'underline',
});

export const MainInput = styled(InputBase)(({ theme }) => ({
	marginLeft: '8px', // theme.spacing(1)
	flex: 1,
}));

export const MainIconButton = styled(IconButton)({
	padding: 10,
	width: '44px',
	height: '44px',
});

export const MainButton = styled(Button)({
	background: '#e0e0e0',
	margin: '10px !important',
	width: '100%',
	maxWidth: '250px',
	color: '#000000',
});

export const MainCard = styled(Card)({
	margin: '15px 0',
	width: '100%',
});

export const MainCardTypo = styled(Typography)({
	padding: '10px',
	color: '#818181',
	['@media (max-width: 770px)']: {
		wordBreak: 'break-all',
	},
});

export const MainNetworkSelect = styled(Select)({
	width: '120px',
	marginRight: '20px',
	textAlign: 'center',
	backgroundColor: '#fff',
	borderRadius: '3px',
	paddingTop: '4px !important',
	paddingBottom: '4px !important',

	'& .MuiSelect-select': {
		padding: '0',
	},

	'& .MuiPaper-rounded': {
		marginTop: '10px',
	},
});

export const MainFooterTypo = styled(Typography)({
	padding: '10px 20px',
	color: '#818181',
	['@media (max-width: 770px)']: {
		fontSize: '13px',
		padding: '5px 20px',
	},
});
