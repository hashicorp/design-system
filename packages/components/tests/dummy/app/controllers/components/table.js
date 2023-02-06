import Controller from '@ember/controller';

export default class ComponentsTableController extends Controller {
  @tracked
  get customSort() {
    let myCustomDataArray = [
      'critical',
      'warning',
      'success',
      'highlight',
      'neutral',
    ];
    return (a, b) => {
      const aIndex = myCustomDataArray.indexOf(a['badge-color']);
      const bIndex = myCustomDataArray.indexOf(b['badge-color']);
      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
      console.log(
        `a custom sort function was applied.`,
        aIndex,
        bIndex,
        ...arguments
      );
    };
  }
}
