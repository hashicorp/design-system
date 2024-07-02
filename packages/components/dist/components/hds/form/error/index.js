import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} id={{this.id}} {{did-insert this.onInsert}} {{will-destroy this.onRemove}} ...attributes>\n  <FlightIcon class=\"hds-form-error__icon\" @name=\"alert-diamond-fill\" />\n  <Hds::Text::Body class=\"hds-form-error__content\" @tag=\"div\" @size=\"100\" @weight=\"medium\">\n    {{yield (hash Message=(component \"hds/form/error/message\"))}}\n  </Hds::Text::Body>\n</div>\n");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ID_PREFIX = 'error-';
const NOOP = () => {};
class HdsFormErrorIndexComponent extends Component {
  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
   */
  get id() {
    let {
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
  get onInsert() {
    let {
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
  get onRemove() {
    let {
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
    let classes = ['hds-form-error'];

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormErrorIndexComponent);

export { ID_PREFIX, HdsFormErrorIndexComponent as default };
//# sourceMappingURL=index.js.map
