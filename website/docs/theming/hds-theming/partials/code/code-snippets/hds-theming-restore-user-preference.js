import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service hdsTheming;

  async beforeModel() {
    // ...
    const storedTheme = localStorage.getItem('hds-theme');
    if (storedTheme) {
      this.hdsTheming.setTheme({ theme: storedTheme });
    }
  }
}
