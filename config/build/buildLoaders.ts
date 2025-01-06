import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IBuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader";
// import ReactRefreshTypeScript from 'react-refresh-typescript';

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
    const {mode} = options;
    const isDev = mode === 'development';

    const cssModuleLoader = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssModuleLoader,
            "sass-loader",
        ],
    }

    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: {
    //         loader: 'ts-loader',
    //         options: {
    //             transpileOnly: true,
    //             getCustomTransformers: () => ({
    //                 before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //             })
    //         }
    //     },
    //     exclude: /node_modules/,
    // }

    const babelLoader = buildBabelLoader(options)

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    return [
        scssLoader,
        // tsLoader,
        babelLoader,
        assetLoader,
        svgrLoader
    ];
}