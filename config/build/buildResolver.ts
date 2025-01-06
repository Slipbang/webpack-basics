import {Configuration} from "webpack";
import {IBuildOptions} from "./types/types";

export function buildResolver(options: IBuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src,
        }
    };
}