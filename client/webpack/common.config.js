const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: "babel-loader?cacheDirectory" },
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: { loader: "file-loader" },
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: "style-loader", // inject CSS to page
					},
					{
						loader: "css-loader", // translates CSS into CommonJS modules
					},
					{
						loader: "postcss-loader", // Run postcss actions
						options: {
							// `postcssOptions` is needed for postcss 8.x;
							// if you use postcss 7.x skip the key
							postcssOptions: {
								// postcss plugins, can be exported to postcss.config.js
								plugins: function () {
									return [require("autoprefixer")];
								},
							},
						},
					},
					{
						loader: "sass-loader", // compiles Sass to CSS
					},
				],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
	],
};
