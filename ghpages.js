/* global rm, cp, ls*/
require('shelljs/global');

var pkg = require('./package.json');
var ghPagesDir = '../' + pkg.name + '-gh-pages';

var matches = ls(ghPagesDir);
if (!(matches && matches.length)) {
  throw new Error('Expected to find "' + ghPagesDir + '"');
}

console.log('Cleaning contents of directory "' + ghPagesDir + '"...');
rm('-rf', ghPagesDir + '/*');

console.log('Copying "dist/" to "' + ghPagesDir + '"...');
cp('-rf', 'dist/*', ghPagesDir);

console.log('Finished updating gh-pages folder. Remember to `git push`.');
