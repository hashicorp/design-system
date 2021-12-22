import Route from '@ember/routing/route';

import catalog from '@hashicorp/flight-icons/catalog.json';
export default class IndexRoute extends Route {
  model() {
    this.icons = catalog.assets.map(
      ({ iconName, fileName, size, description }) => {
        return {
          iconName: `${iconName}`,
          name: `${fileName}`,
          size: `${size}`,
          description: `${description}`,
          searchable: `${iconName}, ${description}`,
        };
      }
    );

    return this.icons;
  }
}
