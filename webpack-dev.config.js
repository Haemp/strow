const path = require('path');

module.exports = {
    entry: './app/Strow.js',
    output: {
        filename: path.join('app', 'strow.bundle.js')
    },
    devtool: 'source-map',
    watch: true
};

