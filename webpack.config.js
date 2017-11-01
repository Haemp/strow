const path = require('path');

module.exports = {
    entry: './app/Strow.js',
    output: {
        filename: path.join('build', 'strow.bundle.js')
    },
    devtool: 'source-map',
    watch: true
};

