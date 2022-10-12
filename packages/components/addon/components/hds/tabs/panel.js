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
  // TODO: switch to {{unique-id}} when we're able
  // (https://github.com/emberjs/ember.js/blob/089a021b1b5c5f8ea1cb574fcd841a73af7b2031/packages/%40ember/-internals/glimmer/lib/helpers/unique-id.ts#L6)
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
