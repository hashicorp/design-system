/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import { iconNames } from '@hashicorp/flight-icons/svg';
import { IconRegistry } from '@hashicorp/flight-icons/symbol-js/registry';
import {
  HdsIconSizeValues,
  HdsIconColorValues,
  HdsIconLibraryValues,
} from './types.ts';

import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsIconRegistryEntry } from '@hashicorp/flight-icons/symbol-js/registry';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type HdsIconRegistryService from '@hashicorp/design-system-components/services/hds-icon-registry';
import type { HdsIconDefinition } from '@hashicorp/design-system-components/services/hds-icon-registry';
import type { HdsIconSizes, HdsIconColors } from './types.ts';

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
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly hdsIconRegistry: HdsIconRegistryService;

  private _iconId = 'icon-' + guidFor(this);
  private _titleId = 'title-' + guidFor(this);

  get definition(): HdsIconDefinition {
    return {
      name: this.name,
      size: this.size,
      library: this.isCarbon
        ? HdsIconLibraryValues.Carbon
        : HdsIconLibraryValues.Flight,
    };
  }

  get name(): HdsIconSignature['Args']['name'] {
    const { name } = this.args;

    assert(
      'Please provide to <Hds::Icon> a value for @name',
      name !== undefined
    );

    return name;
  }

  get registryEntry(): HdsIconRegistryEntry | undefined {
    const registryEntry = IconRegistry[this.name];

    assert(
      `The icon @name "${this.args.name}" or @size "${this.args.size}" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`,
      registryEntry !== undefined
    );

    return IconRegistry[this.name];
  }

  get hasCarbonEquivalent(): boolean {
    return this.registryEntry?.carbon !== null;
  }

  get isCarbon(): boolean {
    return this.hdsTheming.isCarbonThemeEnabled && this.hasCarbonEquivalent;
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

  get size(): HdsIconSizes {
    return this.args.size ?? HdsIconSizeValues.Sixteen;
  }

  get svgSize(): { width: string; height: string } {
    return {
      width: this.size,
      height: this.size,
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
    const { name, stretched } = this.args;
    const classes = ['hds-icon'];

    // add a class based on the @name argument
    classes.push(`hds-icon-${name}`);

    if (this.isInline) {
      classes.push('hds-icon--is-inline');
    }

    if (stretched) {
      classes.push('hds-icon--stretched');
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

  get symbolId(): string {
    return this.hdsIconRegistry.getSymbolId(this.definition) ?? '';
  }

  loadIcon = modifier(() => {
    this.hdsIconRegistry.requestLoad(this.definition);
  });

  <template>
    <svg
      class={{this.classNames}}
      ...attributes
      aria-hidden={{if @title "false" "true"}}
      aria-labelledby={{this.ariaLabelledby}}
      data-test-icon={{this.name}}
      data-has-carbon-equivalent={{this.hasCarbonEquivalent}}
      data-is-carbon={{this.isCarbon}}
      fill={{this.fillColor}}
      id={{this._iconId}}
      role={{this.role}}
      width={{this.svgSize.width}}
      height={{this.svgSize.height}}
      viewBox="0 0 {{this.size}} {{this.size}}"
      xmlns="http://www.w3.org/2000/svg"
      {{this.loadIcon}}
    >
      {{#if @title}}
        <title id={{this._titleId}}>{{@title}}</title>
        <g role="presentation">
          <use href="#{{this.symbolId}}"></use>
        </g>
      {{else}}
        <use href="#{{this.symbolId}}"></use>
      {{/if}}
    </svg>
  </template>
}
