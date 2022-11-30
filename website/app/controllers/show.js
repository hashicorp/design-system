import Controller from '@ember/controller';
import showdown from 'showdown';

const mapElementsToClassNames = {
  h1: 'doc-markdown-h1',
  h2: 'doc-markdown-h2',
  h3: 'doc-markdown-h3',
  h4: 'doc-markdown-h4',
  h5: 'doc-markdown-h5',
  h6: 'doc-markdown-h6',
  p: 'doc-markdown-p',
  blockquote: 'doc-markdown-blockquote',
  ul: 'doc-markdown-ul',
  ol: 'doc-markdown-ol',
  li: 'doc-markdown-li',
  img: 'doc-markdown-img',
  a: 'doc-markdown-a',
  table: 'doc-markdown-table',
  thead: 'doc-markdown-thead',
  tbody: 'doc-markdown-tbody',
  tr: 'doc-markdown-tr',
  td: 'doc-markdown-td',
  th: 'doc-markdown-th',
  pre: 'doc-markdown-pre',
  code: 'doc-markdown-code',
  hr: 'doc-markdown-hr',
};

// SET SHOWDOWN SETTINGS HERE:
// https://showdownjs.com/docs/available-options/
// https://github.com/showdownjs/showdown/wiki/Showdown-Options

const showdownConfig = {
  // enable support for tables in markdown
  // see: https://showdownjs.com/docs/available-options/#tables
  tables: true,
  // enable support for strikethrough in markdown
  // see: https://showdownjs.com/docs/available-options/#strikethrough
  strikethrough: true,
  // enable support for image sizes in markdown
  // see: https://showdownjs.com/docs/available-options/#parseimgdimensions
  parseImgDimensions: true,
  // enable custom ID for a heading
  // see: https://showdownjs.com/docs/available-options/#customizedheaderid
  // notice: later it may be replaced with a more comprehensive way to handle HTML attributes (similar to https://github.com/arve0/markdown-it-attrs)
  customizedHeaderId: true,
  // enable generations of heading IDs compatible with GitHub style
  // see: https://showdownjs.com/docs/available-options/#ghcompatibleheaderid
  ghCompatibleHeaderId: true,
  // add default class for each HTML element generated
  // see: https://github.com/showdownjs/showdown/wiki/Extensions + https://showdownjs.com/docs/tutorials/add-default-class-to-html/
  extensions: Object.keys(mapElementsToClassNames).map((element) => ({
    type: 'output',
    // this is a custom regex, modified from the one found in the original tutolrial, to make it more solid and encompass more use cases
    // for testing see: https://regex101.com/r/jLk7wN/2 + https://regex101.com/r/jLk7wN/5
    // IMPORTANT: we NEED to set the "g" global option here!
    regex: new RegExp(`<${element}>|<${element} (.*)>`, 'g'),
    replace: function (text) {
      // IMPORTANT: we DO NOT NEED to set the "g" global option here!
      const regexBasic = new RegExp(`<${element}>`);
      const matchBasic = text.match(regexBasic);
      const regexWithAttrs = new RegExp(`<${element} (.*)>`);
      const matchWithAttrs = text.match(regexWithAttrs);

      let attrs;

      // eg. <h1> <p> <td>
      if (matchBasic) {
        attrs = `class="${mapElementsToClassNames[element]}"`;
      }
      // eg. <hr /> <th style="text-align:center;"> <pre class="language-shell"><code class="shell language-shell">
      if (matchWithAttrs) {
        const rest = matchWithAttrs[1];
        if (rest.includes('class="')) {
          attrs = rest.replace(
            'class="',
            `class="${mapElementsToClassNames[element]} `
          );
        } else {
          attrs = `class="${mapElementsToClassNames[element]}" ${rest}`;
        }
      }

      return `<${element} ${attrs}>`;
    },
  })),
};
export default class ShowController extends Controller {
  get title() {
    // TODO! do something smarter than this :)
    return this.model.frontmatter?.title ?? 'This is the (missing) page title';
  }

  get description() {
    // return this.model.frontmatter?.description ?? false;
    // TODO! do something smarter than this :)
    return (
      this.model.frontmatter?.description ??
      'This is the (missing) long description, that will come from the frontmatter attributes'
    );
  }

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }
}
