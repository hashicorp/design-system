// RELEVANT LINKS
// - https://github.com/empress/broccoli-static-site-json/blob/master/lib/markdown-to-jsonapi.js (__heavily__ inspired from)

/* eslint-env node */

const PersistentFilter = require('broccoli-persistent-filter');
const { mv } = require('broccoli-stew');
const yamlFront = require('yaml-front-matter');
const { Serializer } = require('jsonapi-serializer');
const _ = require('lodash');

class MarkdownToJsonApi extends PersistentFilter {
  constructor(folder) {
    super(folder);
    this.extensions = ['md'];
    this.targetExtension = 'json';
    this.serializerAttributes = {
      content: ['path', 'content', 'toc'],
      // NOTICE: this list for now needs to be _manually_ aligned with a similar one found in `website/app/routes/show.js`
      frontmatter: [
        'title',
        'description',
        'caption',
        'links',
        'related',
        'layout',
        'previewImage',
        'navigation',
      ],
    };

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

    const baseProperties = {
      // IMPORTANT: this is the "component" ID which is used to get the correct backing class for the markdown "component"
      // This ID is spread in the `route` class on the page model for "show" (`id: res.data.id`) and this becomes the "component" ID (that's my understanding)
      // ⚠️ DON'T USE the `getDestFilePath` to generate an ID or it will cause a bug
      // (the backing classes associated to the markdown files are not correctly loaded when "show" is generated)
      id: relativePath.replace(/\.md$/, ''), // relativePath = 'components/alert/index.md' –> id = 'components/alert/index'
      // this is the (relative) path of the JSON file
      path: this.getDestFilePath(relativePath), // relativePath = 'components/alert/index.md' –> path = 'components/alert/index.json'
      // TODO! rename this property to `markdown` (more semantic)
      content: markdown,
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

module.exports = function (funnel, folder) {
  const jsonApiTree = new MarkdownToJsonApi(funnel);
  return mv(jsonApiTree, folder);
};
