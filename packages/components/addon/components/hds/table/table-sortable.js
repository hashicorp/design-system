import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class HdsTableTableSortableComponent extends Component {
  a11yMessageId = 'table-a11y-message-' + guidFor(this);

  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || 'asc';

  get getSortCriteria() {
    return `${this.sortBy}:${this.sortOrder}`;
  }

  @action
  setSortBy(column) {
    if (this.sortBy === column) {
      //invert the sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    const currentColHeading = event.target;
    const currColHeadingText = currentColHeading.textContent;

    const liveRegion = document.querySelector(`#${this.a11yMessageId}`);
    liveRegion.textContent = `Sorted by ${currColHeadingText} ${this.sortOrder}ending`;
    setTimeout(function () {
      liveRegion.textContent = '';
    }, 2000);
  }
}
