import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generates a unique ID for the Panel
   *
   * @param panelId
   */
  panelId = 'panel-' + guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.panelIds
      ? this.args.panelIds.indexOf(this.panelId)
      : undefined;
  }

  get tabId() {
    return this.nodeIndex !== undefined
      ? this.args.tabIds[this.nodeIndex]
      : undefined;
  }

  get isSelected() {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  @action
  didInsertNode(element) {
    let { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this.elementId = element.id;
      didInsertNode(this.elementId, ...arguments);
    }
  }
}
