import Controller from '@ember/controller';
import showdown from 'showdown';

import { showdownConfig } from '../shared/showdown-config';

export default class ShowController extends Controller {
  get title() {
    // TODO! do something smarter than this :)
    return this.model.frontmatter?.title ?? 'This is the (missing) page title';
  }

  get description() {
    // return this.model.frontmatter?.description ?? false;
    // TODO! do something smarter than this :)
    return (
      this.model.frontmatter?.description ??
      'This is the (missing) long description, that will come from the frontmatter attributes'
    );
  }

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }
}
