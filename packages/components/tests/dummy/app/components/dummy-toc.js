import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DummyTocComponent extends Component {
  @service router;

  get dummyRouteUrl() {
    let dummyPathUrl = this.router.currentURL;
    return dummyPathUrl;
  }
}
