import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoGenericFilters = {};
  @tracked name = '';
  @tracked nameExtra = '';
  @tracked showExtraName = false;

  @action
  demoUpdateGenericFilters(newFilters) {
    if (newFilters['demo-generic']) {
      const data = newFilters['demo-generic'].data;
      this.name = String(data[0]?.value);
      this.nameExtra = String(data[1]?.value);
      this.showExtraName = data.length > 1;
    } else {
      this.name = '';
      this.nameExtra = '';
      this.showExtraName = false;
    }
    this.demoGenericFilters = newFilters;
  }

  @action
  addExtraName() {
    this.showExtraName = true;
  }

  @action
  removeExtraName() {
    this.showExtraName = false;
    this.nameExtra = '';
  }

  @action
  onNameChange(updateFilter, event) {
    const target = event.target;
    this.name = target.value;

    this.updateFilters(updateFilter);
  }

  @action
  onNameExtraChange(updateFilter, event) {
    const target = event.target;
    this.nameExtra = target.value;

    this.updateFilters(updateFilter);
  }

  @action
  onClear() {
    this.name = '';
    this.nameExtra = '';
    this.showExtraName = false;
  }

  @action
  onFocusOut() {
    // If focus is lost, set it back to the first input in the filter
    const demoNameInput = document.getElementById('demo-name');
    if (demoNameInput) {
      demoNameInput.focus();
    }
  }

  updateFilters(updateFilter) {
    const data = [];
    if (this.name) {
      data.push({
        value: this.name,
        label: this.name,
      });
    }
    if (this.nameExtra) {
      data.push({
        value: this.nameExtra,
        label: this.nameExtra,
      });
    }
    if (data.length > 0) {
      updateFilter({
        type: 'generic',
        data: data,
      });
    }
  }
}
