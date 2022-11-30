import Route from '@ember/routing/route';
import { setup } from 'ember-prism';
import { service } from '@ember/service';

setup();
export default class ApplicationRoute extends Route {
  @service intl;

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }
}
