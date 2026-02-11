/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didUpdate from '@ember/render-modifiers/modifiers/did-update';

import type { ModifierLike } from '@glint/template';
import type Owner from '@ember/owner';

import HdsIcon from '../../icon/index.gts';
import HdsDropdownToggleChevron from './chevron.gts';
import {
  HdsDropdownToggleIconSizeValues,
  HdsDropdownToggleIconAllowedIconValues,
} from './types.ts';

import type { HdsIconSignature } from '../../icon/index.gts';
import type { HdsDropdownToggleIconSizes } from './types.ts';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive/index.gts';

export const DEFAULT_SIZE = HdsDropdownToggleIconSizeValues.Medium;
export const SIZES: HdsDropdownToggleIconSizes[] = Object.values(
  HdsDropdownToggleIconSizeValues
);

export const ALLOWED_ICON_LIST: HdsIconSignature['Args']['name'][] =
  Object.values(HdsDropdownToggleIconAllowedIconValues);

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
  @tracked private _hasImage = true;

  constructor(owner: Owner, args: HdsDropdownToggleIconSignature['Args']) {
    super(owner, args);
    if (!(this.args.icon || this.args.imageSrc)) {
      assert(
        '@icon or @imageSrc must be defined for "Hds::Dropdown::Toggle::Icon"'
      );
    }
  }

  @action
  onDidUpdateImageSrc(): void {
    this._hasImage = true;
  }

  @action
  onImageLoadError(): void {
    this._hasImage = false;
  }

  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Icon" must have a valid value',
      text !== undefined
    );

    return text;
  }

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

  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'medium' && !this.hasChevron) {
      // in this special case we use a larger SVG
      return '24';
    } else {
      // this is the default size (notice: for the "small" variant with chevron, we set the actual size to `12px` via CSS)
      return '16';
    }
  }

  get hasChevron(): boolean {
    if (
      this.args.icon &&
      !ALLOWED_ICON_LIST.includes(this.args.icon) &&
      this.args.hasChevron === false
    ) {
      assert(
        `@hasChevron for "Hds::Dropdown::Toggle::Icon" must be true unless the icon is one of the following: ${ALLOWED_ICON_LIST.join(
          ', '
        )}; received: ${this.args.icon}`
      );
    }

    return this.args.hasChevron ?? true;
  }

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

  <template>
    <button
      class={{this.classNames}}
      aria-label={{this.text}}
      ...attributes
      aria-expanded={{if @isOpen "true" "false"}}
      {{@setupPrimitiveToggle}}
      {{didUpdate this.onDidUpdateImageSrc @imageSrc}}
      type="button"
    >
      <div class="hds-dropdown-toggle-icon__wrapper">
        {{#if @imageSrc}}
          {{#if this._hasImage}}
            <img
              src={{@imageSrc}}
              alt=""
              role="presentation"
              {{on "error" this.onImageLoadError}}
            />
          {{else}}
            <HdsIcon @name="user" @size={{this.iconSize}} />
          {{/if}}
        {{else if @icon}}
          <HdsIcon @name={{@icon}} @size={{this.iconSize}} />
        {{/if}}
      </div>
      {{#if this.hasChevron}}
        <HdsDropdownToggleChevron />
      {{/if}}
    </button>
  </template>
}
