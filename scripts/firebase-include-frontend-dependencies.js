const util = require('util')
const path = require('path');
const readdir = util.promisify(require('fs').readdir);
const writeFile = util.promisify(require('fs').writeFile);

const firebaseTempJSON = require('./firebase-template');
const newFirebaseFile = path.join(__dirname, '../firebase.json');
const appFolder = path.join(__dirname, '../app');

// now we list all the directories inside the node_modules as excludes
(async () => {

    console.log('Reading directories...')
    const directories = await readdir(path.join(appFolder, 'node_modules'));
    const frontendPackage = require('../app/package.json');
    const frontendDeps = Object.keys(frontendPackage.dependencies);

    const excludedDirectories = directories.filter(directory => {
        return !frontendDeps.includes(directory);
    }).map(directory => '**/node_modules/' + directory + '/**')

    firebaseTempJSON.hosting.ignore = firebaseTempJSON.hosting.ignore.concat(excludedDirectories)

    console.log('Writing directories...')
    await writeFile(newFirebaseFile, JSON.stringify(firebaseTempJSON, null, 4))
    console.log('All done!')
})()


