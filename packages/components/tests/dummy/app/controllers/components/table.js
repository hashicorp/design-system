import Controller from '@ember/controller';

export default class ComponentsTableController extends Controller {
  get customSort() {
    return () => {
      console.log('custom sort');
    };
  }
}
