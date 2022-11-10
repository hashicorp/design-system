/* eslint-disable prettier/prettier, ember/no-classic-classes */
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import showdown from 'showdown';
import config from 'ember-get-config';


export default Controller.extend({
  fieldGuideConfig: config['field-guide'],
  renderedContent: computed('model.content', function() {
    const converter = new showdown.Converter();
    return converter.makeHtml(this.model.content);
  })
})
