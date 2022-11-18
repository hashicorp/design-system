import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { setAriaDescribedBy } from '../utils/setAriaDescribedBy';
import { schedule } from '@ember/runloop';

export const DEFAULT_CONTROL_POSITION = 'bottom';
export const DEFAULT_ALIGNMENT = 'left';
export const DEFAULT_LAYOUT = 'fluid';
export const CONTROL_POSITIONS = ['bottom', 'left'];
export const ALIGNMENTS = ['left', 'center'];
export const LAYOUTS = ['fluid', 'fixed'];

export default class HdsFormRadioCardIndexComponent extends Component {
  @tracked ariaDescribedBy = this.args.extraAriaDescribedBy;
  @tracked descriptors = [];

  @action
  setAriaDescribedBy() {
    // we schedule this afterRender to capture all descriptors registered onInsert
    schedule('afterRender', () => {
      setAriaDescribedBy(this);
    });
  }

  /**
   * Sets the position of the control
   * Accepted values: buttom, left
   *
   * @param type
   * @type {string}
   * @default 'bottom'
   */
  get controlPosition() {
    let { controlPosition = DEFAULT_CONTROL_POSITION } = this.args;

    assert(
      `@controlPosition for "Hds::Form::RadioCard" must be one of the following: ${CONTROL_POSITIONS.join(
        ', '
      )}; received: ${controlPosition}`,
      CONTROL_POSITIONS.includes(controlPosition)
    );

    return controlPosition;
  }

  /**
   * Sets the alignment of the content
   * Accepted values: left, center
   *
   * @param alignnment
   * @type {string}
   * @default 'left'
   */
  get alignment() {
    let { alignment = DEFAULT_ALIGNMENT } = this.args;

    assert(
      `@alignment for "Hds::Form::RadioCard" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${alignment}`,
      ALIGNMENTS.includes(alignment)
    );

    return alignment;
  }

  /**
   * Sets the layout of the card within the group
   * Accepted values: fluid, fixed
   *
   * @param layout
   * @type {string}
   * @default 'fluid'
   */
  get layout() {
    let { layout = DEFAULT_LAYOUT } = this.args;

    assert(
      `@layout for "Hds::Form::RadioCard" must be one of the following: ${LAYOUTS.join(
        ', '
      )}; received: ${layout}`,
      LAYOUTS.includes(layout)
    );

    // if the `@layout` is set to 'fixed' we need a `@maxWidth` value to constrain the card to
    if (layout === 'fixed') {
      assert(
        `@maxWidth for "Hds::Form::RadioCard" with @layout "fixed" is required`,
        this.args.maxWidth
      );
    }
    return layout;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-radio-card'];

    if (this.args.checked) {
      classes.push('hds-form-radio-card--checked');
    }
    if (this.args.disabled) {
      classes.push('hds-form-radio-card--disabled');
    }

    // add a class based on the @controlPosition argument
    classes.push(`hds-form-radio-card--control-${this.controlPosition}`);

    // add a class based on the @alignment argument
    classes.push(`hds-form-radio-card--align-${this.alignment}`);

    // add a class based on the @layout argument
    classes.push(`hds-form-radio-card--layout-${this.layout}`);

    return classes.join(' ');
  }
}
