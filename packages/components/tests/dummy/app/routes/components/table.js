import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';
import { tracked } from '@glimmer/tracking';

export default class ComponentsTableRoute extends Route {
  @tracked mySortableTableColumns = [
    {
      key: 'fruit',
      label: 'Fruit',
    },
    {
      key: 'color',
      label: 'Color',
    },
    {
      key: 'shape',
      label: 'Shape',
    },
  ];
  async model() {
    let response = await fetch('/api/folk.json');
    let { data } = await response.json();
    const STATES = ['active', 'default', 'hover', 'focus'];

    // make sure the variable is declared outside of the loop
    // so we can return it in the model response
    let dataResponse = data.map((record) => {
      let { id, attributes } = record;
      return { id, ...attributes };
    });
    const keys = Object.keys(data[0].attributes);
    const columns = keys.map((key) => {
      return { key, label: capitalize(key) };
    });
    return { data: dataResponse, columns, STATES };
  }
}
