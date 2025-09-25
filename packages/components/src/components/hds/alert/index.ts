/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import { HdsAlertColorValues, HdsAlertTypeValues } from './types.ts';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsButtonComponent from '../button';
import type HdsLinkStandaloneComponent from '../link/standalone';
import type { HdsYieldSignature } from '../yield';
import type { HdsAlertColors, HdsAlertTypes } from './types.ts';
import type { HdsAlertTitleSignature } from './title.ts';
import type { HdsAlertDescriptionSignature } from './description.ts';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';

export const TYPES: HdsAlertTypes[] = Object.values(HdsAlertTypeValues);
export const DEFAULT_COLOR: HdsAlertColors = HdsAlertColorValues.Neutral;
export const COLORS: HdsAlertColors[] = Object.values(HdsAlertColorValues);

const SEMANTIC_COLORS: HdsAlertColors[] = [
  HdsAlertColorValues.Warning,
  HdsAlertColorValues.Critical,
  HdsAlertColorValues.Success,
];

export const MAPPING_COLORS_TO_ICONS = {
  [HdsAlertColorValues.Neutral]: 'info',
  [HdsAlertColorValues.Highlight]: 'info',
  [HdsAlertColorValues.Success]: 'check-circle',
  [HdsAlertColorValues.Warning]: 'alert-triangle',
  [HdsAlertColorValues.Critical]: 'alert-diamond',
} as const;

export interface HdsAlertSignature {
  Args: {
    type: HdsAlertTypes;
    color?: HdsAlertColors;
    icon?: HdsIconSignature['Args']['name'] | false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsAlertTitleSignature>;
        Description?: ComponentLike<HdsAlertDescriptionSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
        LinkStandalone?: WithBoundArgs<
          typeof HdsLinkStandaloneComponent,
          'size'
        >;
        Button?: WithBoundArgs<typeof HdsButtonComponent, 'size'>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAlert extends Component<HdsAlertSignature> {
  @tracked private _role?: string;
  @tracked private _ariaLabelledBy?: string;
  @tracked private _actions: NodeListOf<Element> | null = null;
  @tracked private _titleElement?: HdsAlertTitleSignature['Element'];
  @tracked
  private _descriptionElement?: HdsAlertDescriptionSignature['Element'];

  constructor(owner: Owner, args: HdsAlertSignature['Args']) {
    super(owner, args);

    assert(
      `@type for "Hds::Alert" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${this.args.type}`,
      TYPES.includes(this.args.type)
    );
  }

  // Determines the color scheme for the alert.
  get color(): HdsAlertColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Alert" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  // an Alert which actually alerts users (has role="alert" & aria-live="polite") as opposed to an informational or promo "alert"
  get isSemantic(): boolean {
    return SEMANTIC_COLORS.includes(this.color);
  }

  // The name of the icon to be used.
  get icon(): HdsIconSignature['Args']['name'] | false {
    const { icon } = this.args;

    // If `icon` isn't passed, use the pre-defined one from `color`
    if (icon === undefined) {
      if (this.args.type === 'compact') {
        // for the "compact" type by default we use filled icons
        return `${MAPPING_COLORS_TO_ICONS[this.color]}-fill`;
      } else {
        // for all the other types by default we use outlined icons
        return MAPPING_COLORS_TO_ICONS[this.color];
      }
      // If `icon` is set explicitly to false, user doesn't want any icon in the alert
    } else if (icon === false) {
      assert(
        `@icon for "Hds::Alert" with @type "compact" is required`,
        this.args.type !== 'compact'
      );

      return false;
    } else {
      // If a name for `icon` is passed, set HdsIcon to that name
      return icon;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false {
    const { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  // Ensures that the correct icon size is used. Automatically calculated.
  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.type === 'compact') {
      return '16';
    } else {
      return '24';
    }
  }

  get classNames(): string {
    const classes = ['hds-alert'];

    // Add a class based on the @type argument
    classes.push(`hds-alert--type-${this.args.type}`);

    // Add a class based on the @color argument
    classes.push(`hds-alert--color-${this.color}`);

    return classes.join(' ');
  }

  get role(): 'alertdialog' | 'alert' | undefined {
    if (this.isSemantic && this._actions && this._actions.length > 0) {
      return 'alertdialog';
    } else if (this.isSemantic) {
      return 'alert';
    } else {
      return undefined;
    }
  }

  get labelElement(): HdsAlertTitleSignature['Element'] | undefined {
    return this._titleElement ?? this._descriptionElement;
  }

  private _registerActions = modifier((element: HTMLDivElement) => {
    this._actions = element.querySelectorAll('button, a');
  });

  private _setLabelElementId() {
    if (this.labelElement === undefined) {
      return;
    }

    const labelId =
      this.labelElement.getAttribute('id') ?? guidFor(this.labelElement);

    this.labelElement.setAttribute('id', labelId);

    this._ariaLabelledBy = labelId;
  }

  @action
  _registerTitle(element: HdsAlertTitleSignature['Element']): void {
    this._titleElement = element;
    this._setLabelElementId();
  }

  @action
  _registerDescription(element: HdsAlertDescriptionSignature['Element']): void {
    this._descriptionElement = element;
    this._setLabelElementId();
  }
}
