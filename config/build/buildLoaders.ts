import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const slyleLoader = {
        test: /\.scss|css$/i,
        use: [
            // options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            'autoprefixer'
                        ]
                    }
                },
            },
            "sass-loader",
        ],
    };

    const fontLoader = {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
            filename: 'assets/fonts/[name][ext]',
        }
    };

    const svgLoader = {
        test: /icon-.*\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
            extract: true,
            spriteFilename: 'sprite.svg',
            publicPath: '/assets/sprite/',
        }
    }

    return [
        typeScriptLoader,
        slyleLoader,
        fontLoader,
        svgLoader,
    ]
}
