import Route from '@ember/routing/route';

export default class ComponentsTableRoute extends Route {
  async model() {
    let response = await fetch('/api/music.json');
    let { data } = await response.json();

    return data.map((model) => {
      let { id, attributes } = model;
      // maybe ?
      let keys = Object.keys(attributes);

      return { id, keys, ...attributes };
    });
  }
}
