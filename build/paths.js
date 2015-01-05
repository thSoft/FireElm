var path = require('path');

exports.build = path.dirname(process.argv[1]);
exports.root = path.join(exports.build, '..');
exports.sourceTypeScript = path.join(exports.root, 'src/typescript');
exports.target = path.join(exports.root, 'target');