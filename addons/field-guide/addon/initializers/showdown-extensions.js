/* eslint-disable prettier/prettier */
/* global Prism */

import showdown from 'showdown';

import config from 'ember-get-config';

let fieldGuideConfig = config['field-guide'] || {};

export function initialize(/* application */) {

  showdown.subParser('githubCodeBlocks', function (text, options, globals) {
    'use strict';

      // early exit if option is not enabled
      if (!options.ghCodeBlocks) {
        return text;
      }

      text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

      text += '¨0';

      text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, languageBlock, inputCodeblock) {

        var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

        let codeblock = inputCodeblock;

        // First parse the github code block
        // codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
        codeblock = showdown.subParser('detab')(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
        codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

        let match = languageBlock.match(/(\w+)({(.*)})?/);
        let language = '';
        let attributeString = '';

        if(match && match[1]) {
          language = match[1];
          // languageString = ' class="' + match[1] + ' language-' + match[1] + '"';
        }

        if (match && match[3]) {
          attributeString = match[3];
        }

        if(!language) {
          // set the default to shell
          language = 'shell';
        }

        let highlightedCodeBlock = Prism.highlight(codeblock, Prism.languages[language], language) + end;

        // escape { and } for the code sample
        highlightedCodeBlock = highlightedCodeBlock.replace(/{/g, '&#123;').replace(/}/g, '&#125;')

        let preBlock = `<pre class="language-${language}"><code ${language ? `class="${language} language-${language}"` : ''}>${highlightedCodeBlock}</code></pre>`;

        let autoExecuteLanguages = fieldGuideConfig.autoExecuteLanguages || ['html', 'handlebars', 'hbs'];

        let selfExecutingBlock = `<div class="self-executing-code-block">
  <div class="example">
    ${inputCodeblock}
  </div>
  ${preBlock}
</div>`;

        if(attributeString.includes('data-execute=false')) {
          codeblock = preBlock;
        } else if (attributeString.includes('data-execute=true')) {
          codeblock = selfExecutingBlock;
        } else if (autoExecuteLanguages.includes(language)) {
          codeblock = selfExecutingBlock
        } else {
          codeblock = preBlock;
        }



        codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

        // Since GHCodeblocks can be false positives, we need to
        // store the primitive text and the parsed text in a global var,
        // and then return a token
        return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
      });

      // attacklab: strip sentinel
      text = text.replace(/¨0/, '');

      return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
  });
}

export default {
  initialize
};
