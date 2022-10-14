import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';

export default class ComponentsTableRoute extends Route {
  async model() {
    let response = await fetch('/api/folk.json');
    let { data } = await response.json();

    // make sure the variable is declared outside of the loop
    // so we can return it in the model response
    let columns;
    let dataResponse = data.map((model) => {
      let { id, attributes } = model;
      columns = Object.keys(attributes);
      return { id, ...attributes };
    });
    columns = columns.map((column) => {
      return { key: column, label: capitalize(column) };
    });
    return { data: dataResponse, columns };

    // second model goes here if we want to have a second table
  }
}
