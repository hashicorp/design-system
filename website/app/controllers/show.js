import Controller from '@ember/controller';
import showdown from 'showdown';

export default class ShowController extends Controller {
  get renderedContent() {
    const converter = new showdown.Converter();
    return converter.makeHtml(this.model.content);
  }
}
