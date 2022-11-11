import Controller from '@ember/controller';
import showdown from 'showdown';
import config from 'ember-get-config';

// SET SHOWDOWN SETTINGS HERE:
// https://showdownjs.com/docs/available-options/
// https://github.com/showdownjs/showdown/wiki/Showdown-Options

const showdownConfig = {
  // enable support for tables in markdown (see: https://showdownjs.com/docs/available-options/#tables)
  tables: true,
  // enable support for strikethrough in markdown (see: https://showdownjs.com/docs/available-options/#strikethrough)
  strikethrough: true,
  // enable support for image sizes in markdown (see: https://showdownjs.com/docs/available-options/#parseimgdimensions)
  parseImgDimensions: true,
  // enable custom ID for a heading (see: https://showdownjs.com/docs/available-options/#customizedheaderid)
  // notice: later it may be replaced with a more comprehensive way to handle HTML attributes (similar to https://github.com/arve0/markdown-it-attrs)
  customizedHeaderId: true,
  // enable generations of heading IDs compatible with GitHub style (see: https://showdownjs.com/docs/available-options/#ghcompatibleheaderid)
  ghCompatibleHeaderId: true,
};
export default class ShowController extends Controller {
  fieldGuideConfig = config['field-guide'];

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }
}
