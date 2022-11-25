const PersistentFilter = require('broccoli-persistent-filter');
const yamlFront = require('yaml-front-matter');
const showdown = require('showdown');
const _ = require('lodash');
const h2p = require('html2plaintext');
const { Serializer } = require('jsonapi-serializer');
const { JSDOM } = require('jsdom');

const supportedContentTypes = ['content', 'html', 'description', 'toc'];

class MarkDownToJsonApi extends PersistentFilter {
  constructor(folder, options) {
    super(folder, options);
    this.extensions = ['md', 'markdown'];
    this.targetExtension = 'json';
    this.options = {
      contentTypes: ['html', 'content'],
      type: 'content',
      attributes: [],
      references: [],
      ...options,
    };

    const unsupportedContentTypes = _.difference(this.options.contentTypes, supportedContentTypes);

    if (unsupportedContentTypes.length) {
      throw new Error(`Unknown content type: ${unsupportedContentTypes[0]}`);
    }

    this.converter = new showdown.Converter();

    const referenceAttributes = this.options.references.map((ref) => {
      if (typeof ref === 'object') return ref.name;

      return ref;
    });

    // build serialiser for jsonapi
    const serializerOptions = {
      attributes: _.union(
        this.options.contentTypes,
        this.options.attributes,
        referenceAttributes,
      ),
      keyForAttribute: 'camelCase',
    };

    referenceAttributes.forEach((reference) => {
      serializerOptions[reference] = { ref: true };
    });

    serializerOptions.typeForAttribute = (attribute) => {
      const customTypeRef = this.options.references.find((ref) => ref.name === attribute);
      if (customTypeRef) {
        return customTypeRef.type;
      }

      return undefined;
    };

    this.serializer = new Serializer(this.options.type, serializerOptions);
  }

  processString(content, relativePath) {
    const front = yamlFront.loadFront(content);
    const markdown = front.__content.trim();
    const html = this.converter.makeHtml(markdown);

    const dom = new JSDOM(html);
    const headingNodes = dom.window.document.querySelectorAll('h1, h2, h3, h4, h5');

    const toc = [...headingNodes].map((heading) => ({
      text: heading.textContent,
      depth: heading.nodeName.replace(/\D/g, ''),
      id: heading.getAttribute('id'),
    }));

    const baseProperties = {
      path: relativePath,
      id: relativePath.replace(/\.(md|markdown)$/, ''),
      content: markdown,
      html,
      toc,
    };

    const resultHash = { ...baseProperties, ...front };

    if (!resultHash.description && _.includes(this.options.contentTypes, 'description')) {
      const description = _.truncate(h2p(resultHash.html), {
        length: 260,
        separator: /,?\.* +/,
      });

      resultHash.description = description;
    }

    return JSON.stringify(this.serializer.serialize(resultHash));
  }

  // eslint-disable-next-line class-methods-use-this
  getDestFilePath(relativePath) {
    if (relativePath.endsWith('.md') || relativePath.endsWith('.markdown')) {
      return `${relativePath.replace(/.(md|markdown)$/, '')}.json`;
    }
    return null;
  }
}

module.exports = MarkDownToJsonApi;
