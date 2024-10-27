/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { HdsDropdownToggleIconSizeValues } from './types.ts';

import type { HdsIconSignature } from '../../icon';
import type { HdsDropdownToggleIconSizes } from './types';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive.ts';

export const DEFAULT_SIZE = HdsDropdownToggleIconSizeValues.Medium;
export const SIZES: string[] = Object.values(HdsDropdownToggleIconSizeValues);

export interface HdsDropdownToggleIconSignature {
  Args: {
    hasChevron?: boolean;
    icon?: HdsIconSignature['Args']['name'];
    imageSrc?: string;
    isOpen?: boolean;
    size?: HdsDropdownToggleIconSizes;
    text: string;
    setupPrimitiveToggle?: ModifierLike<SetupPrimitiveToggleModifier>;
  };
  Element: HTMLButtonElement;
}

export default class HdsDropdownToggleIcon extends Component<HdsDropdownToggleIconSignature> {
  @tracked hasImage = true;

  constructor(owner: unknown, args: HdsDropdownToggleIconSignature['Args']) {
    super(owner, args);
    if (!(this.args.icon || this.args.imageSrc)) {
      assert(
        '@icon or @imageSrc must be defined for "Hds::Dropdown::Toggle::Icon"'
      );
    }
  }

  @action
  onDidUpdateImageSrc(): void {
    this.hasImage = true;
  }

  @action
  onImageLoadError(): void {
    this.hasImage = false;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Icon" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small` and `medium`
   */
  get size(): HdsDropdownToggleIconSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Dropdown::Toggle::Icon" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 24
   * @description ensures that the correct icon size is used
   */
  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'medium' && !this.hasChevron) {
      // in this special case we use a larger SVG
      return '24';
    } else {
      // this is the default size (notice: for the "small" variant with chevron, we set the actual size to `12px` via CSS)
      return '16';
    }
  }

  /**
   * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
   *
   * @param hasChevron
   * @type {boolean}
   * @default true
   */
  get hasChevron(): boolean {
    return this.args.hasChevron ?? true;
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleIcon#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-dropdown-toggle-icon'];

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle-icon--size-${this.size}`);

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-icon--is-open');
    }

    // add a class based on the @hasChevron argument
    if (this.hasChevron) {
      classes.push('hds-dropdown-toggle-icon--has-chevron');
    }

    return classes.join(' ');
  }
}
