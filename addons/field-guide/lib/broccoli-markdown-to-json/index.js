const BroccoliFunnel = require('broccoli-funnel');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const { mv } = require('broccoli-stew');

const MarkdownToJsonApi = require('./lib/markdown-to-jsonapi');

module.exports = function ProcessMarkdownToJson(folder) {
  const sourceMarkdownFunnel = new BroccoliFunnel(folder, {
    // include: ['**/!(index).md'],
    include: ['**/*.md'],
  });
  const jsonApiTree = new MarkdownToJsonApi(sourceMarkdownFunnel);
  const compiledTrees = new BroccoliMergeTrees([jsonApiTree]);
  return mv(compiledTrees, folder);
};
