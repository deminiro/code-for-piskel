/* eslint-disable */

const fs = require('fs');

const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/node: false/g, "node: {crypto: true, stream: true, fs: 'empty', net: 'empty'}");

  fs.writeFile(f, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
