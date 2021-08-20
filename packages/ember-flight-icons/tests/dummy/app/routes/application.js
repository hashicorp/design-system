import Route from '@ember/routing/route';
import fetch from 'fetch';
import { getOwner } from '@ember/application';

export default class ApplicationRoute extends Route {
  get contextRootURL() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config.rootURL || '/';
  }

  async model() {
    const response = await fetch(
      `${this.contextRootURL}@hashicorp/ember-flight-icons/icons/_catalog.json`
    );
    const json = await response.json();

    return json.map(({ Name, Size }) => {
      return {
        Name,
        Size,
        searchable: `${Name}`,
      };
    });
  }
}
