import Controller from '@ember/controller';
import showdown from 'showdown';
import config from 'ember-get-config';

const mapElementsToClassNames = {
  // TODO decide if shorten them to `doc-md-[...]`
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
    regex: new RegExp(`<${element}>|<${element} (.*)>`, 'g'),
    // TODO! with `code` and `pre` this is replaced by the `language` classes, we have to find a way to concatenate the strings (not sure how though)
    // maybe a solition here? https://regex101.com/r/I2FB9N/1
    replace: `<${element} class="${mapElementsToClassNames[element]}" $1>`,
  })),
};
export default class ShowController extends Controller {
  fieldGuideConfig = config['field-guide'];

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }
}
