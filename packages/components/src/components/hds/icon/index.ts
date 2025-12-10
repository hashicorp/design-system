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
import { IconRegistry } from '@hashicorp/flight-icons/js-symbols/registry';
import { task } from 'ember-concurrency';
import { modifier } from 'ember-modifier';
import { HdsIconSizeValues, HdsIconColorValues } from './types.ts';

import type { SafeString } from '@ember/template';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type { IconModuleName } from '@hashicorp/flight-icons/js-symbols/registry.ts';
import type { HdsIconSizes, HdsIconColors } from './types';
import type HdsCarbonService from '../../../services/hds-carbon.ts';

export const COLORS: HdsIconColors[] = Object.values(HdsIconColorValues);
export const NAMES = iconNames;

interface IconModule {
  flight: (symbolId: string) => string;
  carbon: ((symbolId: string) => string) | null;
}

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
  @service declare readonly hdsCarbon: HdsCarbonService;

  @tracked iconModule: IconModule | null = null;

  private _iconId = 'icon-' + guidFor(this);
  private _titleId = 'title-' + guidFor(this);

  loadIconModule = modifier(
    (
      _element: SVGElement,

      _positional: [],
      {
        name,
        size,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        carbonModeEnabled,
      }: { name: IconName; size: HdsIconSizes; carbonModeEnabled: boolean }
    ) => {
      void this.loadIconModuleTask.perform(name, size);
    }
  );

  get name(): HdsIconSignature['Args']['name'] {
    const { name } = this.args;

    if (name === undefined) {
      assert('Please provide to <Hds::Icon> a value for @name');
    }

    return name;
  }

  get iconHtml(): SafeString | undefined {
    const module = this.iconModule;

    if (module == null) {
      return undefined;
    }

    const generator =
      this.hdsCarbon.carbonModeEnabled && module.carbon !== null
        ? module.carbon
        : module.flight;

    const iconHtml = htmlSafe(generator(this.uniqueSymbolId));

    return iconHtml;
  }

  get uniqueSymbolId(): string {
    return `${this._iconId}-symbol`;
  }

  get isInline(): boolean {
    return this.args.isInline ?? false;
  }

  get predefinedColor(): HdsIconColors | undefined {
    const { color } = this.args;

    if (color && COLORS.includes(color as HdsIconColors)) {
      return color as HdsIconColors;
    } else {
      return undefined;
    }
  }

  get fillColor(): string {
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

  get title(): string | null {
    return this.args.title ?? null;
  }

  get role(): string | null {
    return this.args.title ? 'img' : null;
  }

  get ariaLabelledby(): string | null {
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
      const iconModuleName: IconModuleName = `${name}-${size}`;
      const importFn = IconRegistry[iconModuleName];

      if (importFn === undefined) {
        assert(
          `The icon @name "${this.args.name}" or @size "${this.args.size}" provided to <Hds::Icon> is not correct. Please verify the icon exists on https://helios.hashicorp.design/icons/library`
        );
      } else {
        this.iconModule = await importFn();
      }
    }
  );
}
