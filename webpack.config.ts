import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import {IBuildPaths, TBuildMode, TBuildPlatform} from "./config/build/types/types";
import path from "path";

interface IEncVariables {
    mode?: TBuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: TBuildPlatform;
}

export default (env: IEncVariables) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer ?? false,
        platform: env.platform ?? 'desktop',
    });

    return config;
};