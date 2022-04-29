import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ToastController extends Controller {
  // notice: this is used as "noop" function for the onClose callback of the Toast component
  // I tried to use an helper, but without success (see https://hashicorp.slack.com/archives/C11JCBJTW/p1648751235987409)
  @action
  noop() {}
}
