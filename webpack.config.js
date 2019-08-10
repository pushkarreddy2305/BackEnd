module.exports = {
    target:'node',
    entry:'./server.js',
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx']
          },
    }
}
