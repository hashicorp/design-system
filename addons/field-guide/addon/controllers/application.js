/* eslint-disable ember/no-classic-classes */
import Controller from '@ember/controller';
import config from 'ember-get-config';

export default Controller.extend({
  fieldGuideConfig: config['field-guide'],
});
