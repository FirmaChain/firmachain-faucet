import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const minimizeObfuscatorConfig = {
	autoExcludeNodeModules: true,
	threadPool: { enable: true, size: 4 },

	stringArray: true,
	stringArrayEncoding: ['base64', 'rc4'],
	stringArrayThreshold: 1,
	splitStrings: true,
	splitStringsChunkLength: 3,
	transformObjectKeys: true,
	unicodeEscapeSequence: true,

	numbersToExpressions: true,

	compact: true,
	controlFlowFlattening: true,
	controlFlowFlatteningThreshold: 1,
	deadCodeInjection: true,
	deadCodeInjectionThreshold: 1,
	debugProtection: true,
	debugProtectionInterval: true,
	disableConsoleOutput: true,
	identifierNamesGenerator: 'hexadecimal',
	log: false,
	renameGlobals: false,
	selfDefending: true,
	simplify: true,
};

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			nodePolyfills(),
			tsconfigPaths(),
			...(env.NODE_ENV === 'production' ? [vitePluginBundleObfuscator(minimizeObfuscatorConfig)] : []),
		],

		resolve: {
			alias: {
				'@emotion/styled': path.resolve(__dirname, 'node_modules/@mui/styled-engine/node_modules/@mui/styled-engine-sc'),
				'@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine/node_modules/@mui/styled-engine-sc'),
			},
		},

		server: {
			port: env.PORT ? Number(env.port) : 3000,
			host: true,
			strictPort: false,
		},

		preview: {
			port: env.PORT ? Number(env.port) : 3000,
			host: true,
			strictPort: false,
		},

		build: {
			outDir: 'build',
			sourcemap: false,
		},
	};
});
