import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ComponentsPaginationRoute extends Route {
  async model() {
    let response = await fetch('/api/mock-users.json');
    let records = await response.json();
    return { records };
  }
}
