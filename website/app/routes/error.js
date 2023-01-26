import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ErrorRoute extends Route {
  @service fastboot;

  beforeModel() {
    if (this.fastboot.isFastBoot) {
      this.fastboot.response.statusCode = 404;
    }
  }
}
