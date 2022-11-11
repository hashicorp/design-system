import Controller from '@ember/controller';
import showdown from 'showdown';
import config from 'ember-get-config';

export default class ShowController extends Controller {
  fieldGuideConfig = config['field-guide'];

  get renderedContent() {
    const converter = new showdown.Converter();
    return converter.makeHtml(this.model.content);
  }
}
