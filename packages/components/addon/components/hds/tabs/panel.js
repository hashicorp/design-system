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
    return this.args.panelIds.indexOf(this.panelId);
  }

  get tabId() {
    return this.args.tabIds[this.nodeIndex];
  }

  get isSelected() {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  @action
  didInsertNode(element) {
    this.elementId = element.id;
    if (typeof this.args.didInsertNode === 'function') {
      this.args.didInsertNode(this.elementId, ...arguments);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs__panel'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tabs--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
