import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	padding: 0 8px;

	border-radius: 8px;
	background-color: #141414;

	display: flex;
	flex-direction: column;
	overflow: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	> ul {
		margin-top: 6px !important;
		margin-bottom: 6px !important;
	}
`;

export const Container = styled.div<{ $maxHeight?: string }>`
	padding: 16px;
	color: white;
	font-family: 'Courier New', Courier, monospace;
`;

export const Key = styled.span`
	color: #506ee5;
	font-family: 'General Sans Variable';
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
`;

export const Value = styled.span`
	color: #02e191;
	font-family: 'General Sans Variable';
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
`;
