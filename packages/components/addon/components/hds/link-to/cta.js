//  ██     ██  █████  ██████  ███    ██ ██ ███    ██  ██████
//  ██     ██ ██   ██ ██   ██ ████   ██ ██ ████   ██ ██
//  ██  █  ██ ███████ ██████  ██ ██  ██ ██ ██ ██  ██ ██   ███
//  ██ ███ ██ ██   ██ ██   ██ ██  ██ ██ ██ ██  ██ ██ ██    ██
//   ███ ███  ██   ██ ██   ██ ██   ████ ██ ██   ████  ██████
//
// Notice: in this component we're using directly the styles from the `Hds::Button` component
// using the `hds-button` class names (and adding a specialized class for the "cta", see below)
// If you need to change the styling of the `Button` component, remember that this will impact also
// this component too.
// If instead you need to change only the styling of the `CTA` component, you can do it
// in the CSS file using the specialized class declared there.
// This is NOT a standard approach that we use in the HDS design system implementation, but it's been
// the least worst option we could find to solve the problem of sharing the exact same style of the
// `Button (primary)` with other components.

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_ICONPOSITION = 'leading';
export const SIZES = ['small', 'medium', 'large'];
export const ICONPOSITIONS = ['leading', 'trailing'];

export default class HdsLinkToCtaComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the component. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Link::Cta" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the component; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Link::Cta" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    return this.args.icon ?? null;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    let { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Link::Cta" must be one of the following: ${ICONPOSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICONPOSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that the component should take up the full width of the parent container. The default is false.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * @param route
   * @type {string|null}
   * @description Checks to make sure route is defined.
   */
  get route() {
    let { route } = this.args;
    assert(
      '@route must be defined for "Hds::LinkTo::Cta"',
      route !== undefined
    );

    return route;
  }

  // TODO! is this the only way to do it??
  @action
  didInsert(el) {
    // we need to register the element to compare it with the one that triggered the "key/space" event
    this.el = el;
  }

  // TODO! cleanup this before final review
  @action
  onKeySpace(event) {
    console.log(
      'This is triggered for every component instance that is present in the page'
    );
    if (event.target === this.el) {
      console.log(
        'This is triggered only for the component instance that was focused and triggered the “space” event as target',
        event.target
      );
      // for details see: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
      window.open(
        event.target.href,
        event.target.target,
        'noreferrer=true,noopener=true'
      );
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-button',
      'hds-button--color-primary',
      'hds-link-cta--inherit-button-styles',
    ];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-button--width-full');
    }

    return classes.join(' ');
  }
}
