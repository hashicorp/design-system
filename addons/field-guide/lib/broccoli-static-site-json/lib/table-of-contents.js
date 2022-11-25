const PersistentFilter = require('broccoli-persistent-filter');
const { Serializer } = require('jsonapi-serializer');
const yaml = require('js-yaml');

const TableOfContentsSerializer = new Serializer('page', {
  id: 'url',
  attributes: [
    'title',
    'pages',
    'skip_toc',
    'is_heading',
  ],
  keyForAttribute: 'cammelcase',
});

function subpageUrls(parentUrl, currentPage, childPages) {
  if (currentPage && parentUrl) {
    // eslint-disable-next-line no-param-reassign
    currentPage.url = `${parentUrl}/${currentPage.url}`;
  }

  if (childPages) {
    childPages.forEach((page) => {
      subpageUrls(currentPage ? currentPage.url : null, page, page.pages);
    });
  }
}

class TableOfContentsExtractor extends PersistentFilter {
  constructor(folder, options) {
    super(folder, options);
    this.extensions = ['yml', 'json'];
    this.targetExtension = 'json';
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  processString(content, relativePath) {
    let pages;

    if (relativePath.endsWith('pages.yml')) {
      pages = yaml.load(content);
    } else if (relativePath.endsWith('pages.json')) {
      pages = JSON.parse(content);
    }

    if (pages) {
      // add the parent id to each subpage
      subpageUrls(null, null, pages);

      return JSON.stringify(TableOfContentsSerializer.serialize(pages));
    }
  }
}

module.exports = TableOfContentsExtractor;
