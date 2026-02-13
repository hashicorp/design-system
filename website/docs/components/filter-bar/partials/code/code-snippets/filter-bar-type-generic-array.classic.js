import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoGenericArrayName1 = 'Name 1';
  @tracked demoGenericArrayName2 = 'Name 2';
  @tracked demoGenericArrayFilters = {
    'demo-generic-array': {
      type: 'generic',
      text: 'Generic',
      data: [
        { value: this.demoGenericArrayName1, label: this.demoGenericArrayName1 },
        { value: this.demoGenericArrayName2, dismissTagText: `equals ${this.demoGenericArrayName2}` }
      ]
    }
  };

  @action
  demoUpdateGenericArrayFilters(newFilters) {
    this.demoGenericArrayFilters = newFilters;
    if (newFilters['demo-generic-array'] && newFilters['demo-generic-array'].data[0]) {
      this.demoGenericArrayName1 = newFilters['demo-generic-array'].data[0].value ?? '';
    } else {
      this.demoGenericArrayName1 = '';
    }

    if (newFilters['demo-generic-array'] && newFilters['demo-generic-array'].data[1]) {
      this.demoGenericArrayName2 = newFilters['demo-generic-array'].data[1].value ?? '';
    } else {
      this.demoGenericArrayName2 = '';
    }
  };

  @action
  onClear() {
    this.demoGenericArrayName1 = '';
    this.demoGenericArrayName2 = '';
  };

  @action
  onGenericArrayName1Change(
    updateFilter,
    event,
  ) {
    const target = event.target;
    this.demoGenericArrayName1 = target.value;

    this.updateGenericArrayFilters(updateFilter);
  };

  @action
  onGenericArrayName2Change(
    updateFilter,
    event,
  ) {
    const target = event.target;
    this.demoGenericArrayName2 = target.value;

    this.updateGenericArrayFilters(updateFilter);
  };

  updateGenericArrayFilters(updateFilter) {
    const demoGenericArrayNameData = [];
    if (this.demoGenericArrayName1) {
      demoGenericArrayNameData.push({
        value: this.demoGenericArrayName1
      });
    }
    if (this.demoGenericArrayName2) {
      demoGenericArrayNameData.push({
        value: this.demoGenericArrayName2,
        dismissTagText: `equals ${this.demoGenericArrayName2}`,
      });
    }
    if (demoGenericArrayNameData.length > 0) {
      updateFilter({
        type: 'generic',
        text: 'Generic',
        data: demoGenericArrayNameData,
      });
    }
  }
}
