import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} id={{this.id}} {{did-insert this.onInsert}} {{will-destroy this.onRemove}} ...attributes>\n  <FlightIcon class=\"hds-form-error__icon\" @name=\"alert-diamond-fill\" />\n  <Hds::Text::Body class=\"hds-form-error__content\" @tag=\"div\" @size=\"100\" @weight=\"medium\">\n    {{yield (hash Message=(component \"hds/form/error/message\"))}}\n  </Hds::Text::Body>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ID_PREFIX = 'error-';
const NOOP = () => {};
class HdsFormErrorComponent extends Component {
  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
   */
  get id() {
    const {
      controlId
    } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  /**
   * @param onInsert
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onInsert() {
    const {
      onInsert
    } = this.args;

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      return onInsert;
    } else {
      return NOOP;
    }
  }

  /**
   * @param onRemove
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onRemove() {
    const {
      onRemove
    } = this.args;

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onRemove === 'function') {
      return onRemove;
    } else {
      return NOOP;
    }
  }
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-error'];

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormErrorComponent);

export { ID_PREFIX, HdsFormErrorComponent as default };
//# sourceMappingURL=index.js.map
