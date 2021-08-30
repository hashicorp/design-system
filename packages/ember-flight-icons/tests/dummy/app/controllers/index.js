import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const defaultSize = '24';

const checkIsShown = function (searchText, meta) {
  if (searchText === '') {
    return true;
  }

  if (meta.searchable.indexOf(searchText) !== -1) {
    return true;
  }

  return false;
};

export default class IndexController extends Controller {
  @tracked selectedIcon = 'auto-apply';
  @tracked size = '24';
  @tracked color = 'currentColor';
  @tracked searchText = '';

  @tracked search;
  @tracked emptyResults = false;

  get iconHbsCode() {
    let iconHbsCode = `<FlightIcon @name="${this.selectedIcon}"`;

    if (this.size !== defaultSize) {
      iconHbsCode += ` @size=${this.size}`;
    }

    if (this.color) {
      iconHbsCode += ` @color="${this.color}"`;
    }

    iconHbsCode += '/>';

    return iconHbsCode;
  }

  @action
  async updateSearchText(value, signal) {
    await new Promise((resolve) => setTimeout(resolve, 190));

    if (signal.aborted) {
      return;
    }

    this.search = value;
    const lowcased = value.toLowerCase();

    for (let i = 0; i < this.model.length; i++) {
      const item = this.model[i];

      set(item, 'isHidden', !checkIsShown(lowcased, item));
    }

    this.emptyResults = this.model.every(({ isHidden }) => isHidden);
  }

  @action
  debouncedUpdate(event) {
    if (this.ctrl) {
      this.ctrl.abort();
    }
    this.ctrl = new AbortController();
    this.updateSearchText(event.target.value, this.ctrl.signal);
  }

  @action
  updateSelectedItem(event) {
    const iconWrapper = event.target.closest('.demo-icon');
    if (iconWrapper && iconWrapper.dataset.Name) {
      this.selectedIcon = iconWrapper.dataset.Name;
    }
  }
}
