/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import { iconNames } from '@hashicorp/flight-icons/svg';
import { IconRegistry } from '@hashicorp/flight-icons/symbol-js/registry';
import { task } from 'ember-concurrency';
import { modifier } from 'ember-modifier';
import { HdsIconSizeValues, HdsIconColorValues } from './types.ts';

import type { SafeString } from '@ember/template';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type {
  HdsIconModule,
  HdsIconRegistryEntry,
} from '@hashicorp/flight-icons/symbol-js/registry';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type { HdsIconSizes, HdsIconColors } from './types';

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

  @tracked iconModule: HdsIconModule | null = null;

  private _iconId = 'icon-' + guidFor(this);
  private _titleId = 'title-' + guidFor(this);

  // we use a modifier instead of a simple constructor so the component can
  // react to changes to the `@name` and `@size` arguments and reload the
  // correct icon module accordingly
  loadIconModule = modifier(
    (
      _element: SVGElement,

      _positional: [],
      {
        name,
        size,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        carbonThemeEnabled,
      }: { name: IconName; size: HdsIconSizes; carbonThemeEnabled: boolean }
    ) => {
      void this.loadIconModuleTask.perform(name, size);
    }
  );

  get name(): HdsIconSignature['Args']['name'] {
    const { name } = this.args;

    assert(
      'Please provide to <Hds::Icon> a value for @name',
      name !== undefined
    );

    return name;
  }

  get registryEntry(): HdsIconRegistryEntry | undefined {
    const { name, size } = this.args;
    const registryEntry = IconRegistry[this.name];

    assert(
      `The icon @name "${name}" or @size "${size}" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`,
      registryEntry !== undefined
    );

    return IconRegistry[this.name];
  }

  get hasCarbonEquivalent(): boolean {
    return this.registryEntry?.carbon !== null;
  }

  get isCarbon(): boolean {
    return this.hdsTheming.carbonThemeEnabled && this.hasCarbonEquivalent;
  }

  get svgSymbol(): SafeString | undefined {
    if (this.iconModule === null) {
      return undefined;
    }

    return htmlSafe(this.iconModule.default(this.uniqueSymbolId));
  }

  // this is the internal unique DOM `id` for the `<symbol>` element
  get uniqueSymbolId(): string {
    // note: we can't use just the `_iconId` because that's the DOM `id` of the `<svg>` element
    return `${this._iconId}-symbol`;
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

  loadIconModuleTask = task(
    async (name: IconName, size: HdsIconSizes): Promise<void> => {
      let loader;

      if (this.isCarbon) {
        loader = this.registryEntry?.carbon ?? undefined;
        assert(
          `Carbon icon not available for "${name}".`,
          loader !== undefined
        );
      } else {
        loader = this.registryEntry?.flight[size] ?? undefined;
        assert(
          `Flight icon not available for "${name}" with size "${size}".`,
          loader !== undefined
        );
      }

      this.iconModule = await loader();
    }
  );

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
      {{this.loadIconModule
        name=this.name
        size=this.size
        carbonThemeEnabled=this.hdsTheming.carbonThemeEnabled
      }}
    >
      {{#if @title}}
        <title id={{this._titleId}}>{{@title}}</title>
        <g role="presentation">
          <use href="#{{this.uniqueSymbolId}}"></use>
        </g>
      {{else}}
        <use href="#{{this.uniqueSymbolId}}"></use>
      {{/if}}

      {{this.svgSymbol}}
    </svg>
  </template>
}
