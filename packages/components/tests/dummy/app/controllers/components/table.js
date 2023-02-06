import Controller from '@ember/controller';

export default class ComponentsTableController extends Controller {
  get customSort() {
    return (sortBy, sortOrder) => {
      console.log(`sortBy: ${sortBy}, sortOrder: ${sortOrder}`);
    };
  }
}
