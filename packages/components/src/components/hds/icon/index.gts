/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { iconNames } from '@hashicorp/flight-icons/svg';
import { HdsIconSizeValues, HdsIconColorValues } from './types.ts';
import type { HdsIconSizes, HdsIconColors } from './types';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type Owner from '@ember/owner';

export const COLORS: HdsIconColors[] = Object.values(HdsIconColorValues);
export const NAMES = iconNames;

export interface HdsIconSignature {
  Args: {
    name: IconName;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    color?: HdsIconColors | string | undefined;
    size?: HdsIconSizes;
    stretched?: boolean;
    isInline?: boolean;
    title?: string;
  };
  Element: SVGElement;
}

export default class HdsIcon extends Component<HdsIconSignature> {
  private _iconId = 'icon-' + guidFor(this);
  private _titleId = 'title-' + guidFor(this);

  constructor(owner: Owner, args: HdsIconSignature['Args']) {
    super(owner, args);

    if (!this.args.name) {
      assert('Please provide to <Hds::Icon> a value for @name');
    } else if (!iconNames.includes(this.args.name)) {
      assert(
        `The icon @name "${this.args.name}" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`
      );
    }
  }

  get isInline() {
    return this.args.isInline ?? false;
  }

  get predefinedColor() {
    const { color } = this.args;

    if (color && COLORS.includes(color as HdsIconColors)) {
      return color as HdsIconColors;
    } else {
      return undefined;
    }
  }

  get fillColor() {
    if (this.predefinedColor !== undefined) {
      return 'currentColor';
    } else {
      return this.args.color ?? 'currentColor';
    }
  }

  get size() {
    return this.args.size ?? HdsIconSizeValues.Sixteen;
  }

  get svgSize(): { width: string; height: string } {
    return {
      width: this.args.stretched ? '100%' : this.size,
      height: this.args.stretched ? '100%' : this.size,
    };
  }

  get title() {
    return this.args.title ?? null;
  }

  get role() {
    return this.args.title ? 'img' : null;
  }

  get ariaLabelledby() {
    return this.args.title ? this._titleId : null;
  }

  get classNames() {
    const { name } = this.args;
    const classes = ['hds-icon'];

    // add a class based on the @name argument
    classes.push(`hds-icon-${name}`);

    if (this.isInline) {
      classes.push('hds-icon--is-inline');
    }

    // add a (helper) class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`hds-foreground-${this.predefinedColor}`);
    }

    // add an extra class to control the animation (depends on the icon)
    if (['loading', 'running'].includes(name)) {
      classes.push(`hds-icon--animation-${name}`);
    }

    return classes.join(' ');
  }

  <template>
    <svg
      class={{this.classNames}}
      ...attributes
      aria-hidden={{if @title "false" "true"}}
      aria-labelledby={{this.ariaLabelledby}}
      data-test-icon={{@name}}
      fill={{this.fillColor}}
      id={{this._iconId}}
      role={{this.role}}
      width={{this.svgSize.width}}
      height={{this.svgSize.height}}
      viewBox="0 0 {{this.size}} {{this.size}}"
      xmlns="http://www.w3.org/2000/svg"
    >
      {{#if @title}}
        <title id={{this._titleId}}>{{@title}}</title>
        <g role="presentation">
          <use href="#flight-{{@name}}-{{this.size}}" />
        </g>
      {{else}}
        <use href="#flight-{{@name}}-{{this.size}}" />
      {{/if}}
    </svg>
  </template>
}
