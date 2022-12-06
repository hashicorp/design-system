/* eslint-disable prettier/prettier */
/* global Prism */

import showdown from 'showdown';

export function initialize(/* application */) {
  // Overriding `unhashHTMLSpans` subparser to overcome the 10 levels of nesting limit
  showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch(
      'unhashHTMLSpans.before',
      text,
      options,
      globals
    );
  
    for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
      var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 50 as limit for recurse)
        limit = 0;
  
      while (/¨C(\d+)C/.test(repText)) {
        var num = RegExp.$1;
        repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
        if (limit === 50) {
          console.error('maximum nesting of 50 spans reached!!!');
          break;
        }
        ++limit;
      }
      text = text.replace('¨C' + i + 'C', repText);
    }
  
    text = globals.converter._dispatch(
      'unhashHTMLSpans.after',
      text,
      options,
      globals
    );
    return text;
  });

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

        let preBlock = `<pre class="doc-code-block__code-snippet language-${language}"><code ${language ? `class="${language} language-${language}"` : ''}>${highlightedCodeBlock}</code></pre>`;

        let autoExecuteLanguages = ['html', 'handlebars', 'hbs'];

        let selfExecutingBlock = "";
        selfExecutingBlock += '<div class="doc-code-block doc-code-block--self-executing">';
        selfExecutingBlock += '  <div class="doc-code-block__code-rendered">';
        selfExecutingBlock += `    ${inputCodeblock}`;
        selfExecutingBlock += '  </div>';
        selfExecutingBlock += `  ${preBlock}`;
        selfExecutingBlock += '</div>';

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
