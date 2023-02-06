import Controller from '@ember/controller';

export default class ComponentsTableController extends Controller {
  get customSortMethod() {
    return () => {
      console.log('custom sort');
    };
  }
}
