/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { iconNames } from '@hashicorp/flight-icons/svg';
import hdsCarbonIconMap from '../../../utils/hds-carbon-icon-map.ts';
import { carbonMap } from '../../../utils/carbon-import-map.ts';
import { HdsIconSizeValues, HdsIconColorValues } from './types.ts';
import { dropTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import type { HdsIconSizes, HdsIconColors } from './types';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type Owner from '@ember/owner';
import type HdsCarbonService from '../../../services/hds-carbon.ts';
import type { CarbonIcon } from '../../carbon/icon/types.ts';

interface IconInfo {
  name: string;
  isCarbon: boolean;
}

function getIcon(name: IconName): IconInfo {
  const carbonIconName = hdsCarbonIconMap[name];

  if (carbonIconName) {
    return {
      name: carbonIconName,
      isCarbon: true,
    };
  } else {
    return {
      name,
      isCarbon: false,
    };
  }
}

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
  @service declare readonly hdsCarbon: HdsCarbonService;

  @tracked carbonIcon: CarbonIcon | null = null;

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

  get hasLoadedCarbonIcon(): boolean | undefined {
    if (this.hdsCarbon.carbonModeEnabled) {
      return this.carbonIcon !== null;
    } else {
      return undefined;
    }
  }

  get svgSize(): {
    width: HdsIconSizes | '100%';
    height: HdsIconSizes | '100%';
  } {
    const { stretched } = this.args;

    if (stretched) {
      return {
        width: '100%',
        height: '100%',
      };
    }

    let width: HdsIconSizes = this.size;
    let height: HdsIconSizes = this.size;

    if (this.hdsCarbon.carbonModeEnabled && this.carbonIcon !== null) {
      width = this.carbonIcon.attrs.width.toString() as HdsIconSizes;
      height = this.carbonIcon.attrs.height.toString() as HdsIconSizes;
    }

    return { width, height };
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

    const nameClassSegment = this.hasLoadedCarbonIcon
      ? this.carbonIcon!.name
      : name;

    // add a class based on the @name argument
    classes.push(`hds-icon-${nameClassSegment}`);

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

  get viewBox(): string {
    if (this.hasLoadedCarbonIcon) {
      return this.carbonIcon!.attrs.viewBox;
    } else {
      return `0 0 ${this.size} ${this.size}`;
    }
  }

  loadCarbonIcon = modifier((_element, [carbonModeEnabled]) => {
    if (carbonModeEnabled) {
      void this.loadCarbonIconTask.perform();
    } else {
      this.carbonIcon = null;
    }
  });

  loadCarbonIconTask = dropTask(async () => {
    const { name, isCarbon } = getIcon(this.args.name);

    if (!isCarbon) {
      return;
    }

    const icon = await carbonMap[`${name}/${this.size}`]?.();

    this.carbonIcon = (icon?.default as CarbonIcon | undefined) ?? null;
  });
}
