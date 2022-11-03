import Controller from '@ember/controller';
// import showdown from 'showdown';

export default class ShowController extends Controller {
  get renderedContent() {
    console.log(this.model);
    // const converter = new showdown.Converter();
    // return converter.makeHtml(this.model.content);
    // TODO! why a converter here, if the model already returns an HTML???
    return this.model.html;
  }
}
