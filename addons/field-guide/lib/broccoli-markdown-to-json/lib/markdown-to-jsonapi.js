const PersistentFilter = require('broccoli-persistent-filter');
const yamlFront = require('yaml-front-matter');
const showdown = require('showdown');
const _ = require('lodash');
const { Serializer } = require('jsonapi-serializer');
const { JSDOM } = require('jsdom');

class MarkDownToJsonApi extends PersistentFilter {
  constructor(folder) {
    super(folder);
    this.extensions = ['md'];
    this.targetExtension = 'json';
    this.serializerAttributes = {
      content: ['path', 'content', 'toc'],
      // NOTICE: this list for now needs to be _manually_ aligned with a similar one found in `addons/field-guide/addon/routes/show.js`
      frontmatter: [
        'category',
        'group',
        'component',
        'section',
        'title',
        'description',
        'caption',
        'status',
        'layout',
      ],
    };

    this.converter = new showdown.Converter();

    // build serialiser for jsonapi
    const serializerOptions = {
      attributes: _.union(
        this.serializerAttributes.content,
        this.serializerAttributes.frontmatter
      ),
      keyForAttribute: 'camelCase',
    };

    this.serializer = new Serializer('content', serializerOptions);
  }

  processString(content, relativePath) {
    const frontmatter = yamlFront.loadFront(content);
    const markdown = frontmatter.__content.trim();
    const html = this.converter.makeHtml(markdown);

    const dom = new JSDOM(html);
    const headingNodes =
      dom.window.document.querySelectorAll('h1, h2, h3, h4, h5');

    // TODO! TBD if we want to do the TOC here, in this way, or dynamically at runtime via JS (probably better)
    const toc = [...headingNodes].map((heading) => ({
      text: heading.textContent,
      depth: heading.nodeName.replace(/\D/g, ''),
      id: heading.getAttribute('id'),
    }));

    const baseProperties = {
      path: this.getDestFilePath(relativePath),
      // TODO maybe just use `this.getDestFilePath(relativePath)` here too?
      id: relativePath.replace(/\.md$/, ''),
      // TODO! rename this property to `markdown` (more semantic)
      content: markdown,
      html,
      toc,
    };

    const mergedData = { ...baseProperties, ...frontmatter };

    // NOTICE: this serializer uses the "attributes" defined in the serializerOptions
    // to filter the keys that are added to the `data.attributes`
    const serializedData = JSON.stringify(
      this.serializer.serialize(mergedData)
    );

    return serializedData;
  }

  getDestFilePath(relativePath) {
    if (relativePath.endsWith('.md')) {
      return relativePath.replace(/\.md$/, '.json');
    }
    return null;
  }
}

module.exports = MarkDownToJsonApi;
