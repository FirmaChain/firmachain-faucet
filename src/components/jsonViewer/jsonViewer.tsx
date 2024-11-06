import React from 'react';
import { Wrapper } from './styles';
import { JSONTree } from 'react-json-tree';

interface JsonView {
	data: Record<any, any>;
	maxHeight?: string;
	maxWidth?: string;
}

const jsonTheme = {
	// scheme: 'google',
	// author: 'seth wright (http://sethawright.com)',
	base00: '#141414',
	base01: '#282a2e',
	base02: '#373b41',
	base03: '#969896',
	base04: '#b4b7b4',
	base05: '#c5c8c6',
	base06: '#e0e0e0',
	base07: '#ffffff',
	base08: '#CC342B',
	base09: '#F96A38',
	base0A: '#FBA922',
	base0B: '#198844',
	base0C: '#3971ED',
	base0D: '#3971ED',
	base0E: '#A36AC7',
	base0F: '#3971ED',
};

const JsonViewer = ({ data, maxHeight, maxWidth }: JsonView) => {
	return (
		<Wrapper style={{ maxHeight: maxHeight || '400px', maxWidth: maxWidth || '750px', width: '100%', marginLeft: '8px' }}>
			<JSONTree
				data={data}
				theme={jsonTheme}
				shouldExpandNodeInitially={(keyPath, data, level) => {
					if (level <= 3) return true;
					else return false;
				}}
			/>
		</Wrapper>
	);
};

export default React.memo(JsonViewer);
