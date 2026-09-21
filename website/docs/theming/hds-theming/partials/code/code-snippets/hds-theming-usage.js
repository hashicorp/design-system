import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service hdsTheming;

  @action
  setTheme(theme) {
    this.hdsTheming.setTheme({ theme });
  }
}
