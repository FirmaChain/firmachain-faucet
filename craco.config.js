const webpack = require('webpack');
const path = require('path');

const configureWebpack = (webpackConfig, { env, paths }) => {
	const fallback = webpackConfig.resolve.fallback || {};
	webpackConfig.resolve.fallback = Object.assign(fallback, {
		stream: require.resolve('stream-browserify'),
		fs: require.resolve('browserify-fs'),
	});

	const alias = webpackConfig.resolve.alias || {};
	webpackConfig.resolve.alias = Object.assign(alias, {
		'@mui/styled-engine': '@mui/styled-engine-sc',
	});

	webpackConfig.ignoreWarnings = [/Failed to parse source map/];

	webpackConfig.plugins = (webpackConfig.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	]);

	return webpackConfig;
};

const configureCraco = () => {
	return {
		webpack: {
			configure: configureWebpack,
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
	};
};

module.exports = configureCraco();
