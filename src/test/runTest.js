/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const pkg = require('../../package.json');
const changelogFile = fs.readFileSync('./CHANGELOG.md');

if (!changelogFile.toString().includes(pkg.version)) {
  console.log('Forgot to write changes to changelog!');
  process.exit(1);
} else {
  process.exit(0);
}
