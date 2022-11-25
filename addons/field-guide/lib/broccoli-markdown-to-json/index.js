const BroccoliMergeTrees = require('broccoli-merge-trees');
const BroccoliFunnel = require('broccoli-funnel');
const { mv } = require('broccoli-stew');

const MarkdownToJsonApi = require('./lib/markdown-to-jsonapi');

module.exports = function ProcessMarkdownToJson(folder, options = {}) {
  const sourceMarkdownFunnel = new BroccoliFunnel(folder, {
    include: ['**/*.md'],
  });
  const jsonApiTree = new MarkdownToJsonApi(sourceMarkdownFunnel, options);
  const compiledTrees = new BroccoliMergeTrees([jsonApiTree]);
  // TODO! instead of `contentFolder` can I use `folder` which is the same?
  return mv(compiledTrees, folder);
};
