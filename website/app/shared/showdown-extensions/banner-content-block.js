// https://regex101.com/r/j4PHPo/1
const regex = new RegExp(/^!!! (\w+)[\n\s]((.|\n)*?)!!!$/, 'gm');

export const bannerContentBlock = function () {
  var myext1 = {
    type: 'lang',
    regex: /markdown/g,
    replace: 'showdown',
  };
  var myext2 = {
    /* extension code */
  };
  return [myext1, myext2];
};

export const bannerContentBlock_ZZZ = [
  {
    type: 'lang',
    regex: regex,
    replace: function (text) {
      console.log('banner1', text);
      return text.replace(regex, function (_match, type, content) {
        console.log('banner2a', _match);
        console.log('banner2b', type);
        console.log('banner2c', content);
        return `<div data-banner-type="${type}" class="doc-banner" data-markdown="1">\n${content}\n</div>`;
        // return `<aaa class="${type}" data-markdown="1">\n${content}\n</aaa>`;
      });
    },
  },
];

// inspiration for this example taken from here: https://github.com/showdownjs/prettify-extension/blob/master/src/showdown-prettify.js
export const bannerContentBlock__v1 = {
  type: 'lang',
  filter: function (source) {
    console.log('banner1', source);
    return source.replace(regex, function (_match, type, content) {
      console.log('banner2', _match, type, content);
      return `<div class="${type}">\n${content}\n</div>`;
    });
  },
};

// export const bannerContentBlock = {
//   type: 'lang',
//   regex: regex,
//   replace: function (text) {
//     console.log('banner1', text);
//     return text.replace(regex, function (_match, type, content) {
//       console.log('banner2', _match, type, content);
//       return `<div class="${type}">\n${content}\n</div>`;
//     });
//   },
// };

export const bannerContentBlock__v4 = {
  type: 'output',
  regex: new RegExp(`<p>|<p (.*)>`, 'g'),
  replace: function (text) {
    // IMPORTANT: we DO NOT NEED to set the "g" global option here!
    const regexBasic = new RegExp(`<p>`);
    const matchBasic = text.match(regexBasic);
    const regexWithAttrs = new RegExp(`<p (.*)>`);
    const matchWithAttrs = text.match(regexWithAttrs);
    console.log('BBBB', text);

    let attrs;

    // eg. <h1> <p> <td>
    if (matchBasic) {
      attrs = `class="AAAAA"`;
    }
    // eg. <hr /> <th style="text-align:center;"> <pre class="language-shell"><code class="shell language-shell">
    if (matchWithAttrs) {
      const rest = matchWithAttrs[1];
      if (rest.includes('class="')) {
        attrs = rest.replace('class="', `class="BBBBB `);
      } else {
        attrs = `class="CCCCCC" ${rest}`;
      }
    }

    return `<p ${attrs}>`;
  },
};
