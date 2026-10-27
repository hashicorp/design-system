import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service hdsTheming;

  async beforeModel() {
    // ...

    // If you are using FastBoot, guard this browser-only restoration (including setTheme below) because localStorage and the DOM are unavailable.
    const storedTheme = localStorage.getItem('hds-theme');
    if (storedTheme) {
      this.hdsTheming.setTheme({ theme: storedTheme });
    }
  }
}
