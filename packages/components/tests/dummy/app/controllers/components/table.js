import Controller from '@ember/controller';

export default class ComponentsTableController extends Controller {
  get customSort() {
    return () => {
      console.log(`a custom sort function was applied.`);
    };
  }
}
