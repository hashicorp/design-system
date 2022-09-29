/* eslint-env node, mocha */
const guidemakerLinkChecker = require('guidemaker-link-checker');

describe('check all links in markdown files', function () {
  guidemakerLinkChecker();
});
