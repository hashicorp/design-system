'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let options = this.app.options['markdown-it-templates'];
      let TemplateCompiler = require('./lib/markdown-it-template-compiler');
      registry.add('template', new TemplateCompiler(options));
    }
  },
};
