import showdown from 'showdown';

export function initialize(/* application */) {
  // Overriding `unhashHTMLSpans` subparser to overcome the 10 levels of nesting limit
  showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch(
      'unhashHTMLSpans.before',
      text,
      options,
      globals,
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
      globals,
    );
    return text;
  });
}

export default {
  initialize,
};
