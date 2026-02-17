import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoGenericName = 'Name';
  @tracked demoGenericFilters = {
    'demo-generic': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: `equals ${this.demoGenericName}`,
      data: {
        value: this.demoGenericName,
      },
    }
  };

  @action
  demoUpdateGenericFilters(newFilters) {
    this.demoGenericFilters = newFilters;
    this.demoGenericName = newFilters['demo-generic'] ? newFilters['demo-generic'].data.value : '';
  }

  @action
  onClear() {
    this.demoGenericName = '';
  }

  @action
  onGenericNameChange(
    updateFilter,
    event,
  ) {
    const target = event.target;
    this.demoGenericName = target.value;

    this.updateGenericFilters(updateFilter);
  };

  updateGenericFilters(updateFilter) {
    const demoGenericNameData = [];
    if (this.demoGenericName) {
      demoGenericNameData.push({
        value: this.demoGenericName
      });
    }
    if (demoGenericNameData.length > 0) {
      updateFilter({
        type: 'generic',
        text: 'Generic',
        dismissTagText: `equals ${this.demoGenericName}`,
        data: {
          value: this.demoGenericName,
        }
      });
    }
  }
}
