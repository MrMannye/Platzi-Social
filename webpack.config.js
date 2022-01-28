const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    name: "express-server",
    entry: "./api/index.js",
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js','.json']
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}