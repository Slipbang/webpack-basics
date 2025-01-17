import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IBuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: IBuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin(), new ReactRefreshWebpackPlugin());
    }
    if (isProd) {
        plugins.push(
            new CopyPlugin({
                patterns: [
                    {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')},
                ]
            }))
    }
    if (analyzer) plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}