/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { modifier } from 'ember-modifier';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import { hdsBreakpoints } from '../../../utils/hds-breakpoints.ts';
import type { HdsKeyValuePairFieldSignature } from './field.ts';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
    maxRows?: number;
    addRowButtonText?: string;
    onDeleteRowClick?: (index: number) => void;
    columns?: 1 | 2 | 3;
  };
  Blocks: {
    header?: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
    row: [
      {
        Field?: ComponentLike<HdsKeyValuePairFieldSignature>;
        rowData?: unknown;
      },
    ];
    footer?: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsKeyValuePair extends Component<HdsKeyValuePairSignature> {
  private _desktopMQ: MediaQueryList;
  @tracked private _isDesktop = true;
  private _mediaQueryListener!: (event: MediaQueryListEvent) => void;
  private _fieldsetElement!: HTMLFieldSetElement;
  @tracked data: Array<unknown> = this.args.data ?? [];
  @tracked private _currentNumberOfRows = this.data.length ?? 0;

  constructor(owner: Owner, args: HdsKeyValuePairSignature['Args']) {
    super(owner, args);

    this._desktopMQ = window.matchMedia(
      `(min-width:${hdsBreakpoints['sm'].px})`
    );
    this.addEventListeners();

    registerDestructor(this, (): void => {
      this.removeEventListeners();
    });
  }

  private _setUpFieldsetElement = modifier((element: HTMLFieldSetElement) => {
    this._fieldsetElement = element;
  });

  addEventListeners(): void {
    this._mediaQueryListener = (event: MediaQueryListEvent): void => {
      this._isDesktop = event.matches;
    };

    this._desktopMQ.addEventListener('change', this._mediaQueryListener, true);
  }

  removeEventListeners(): void {
    this._desktopMQ.removeEventListener(
      'change',
      this._mediaQueryListener,
      true
    );
  }

  get columns(): string {
    return `${this.args.columns ?? (this._isDesktop ? 2 : 1)}`;
  }

  get addRowButtonText(): string {
    return this.args.addRowButtonText ?? 'Add Row';
  }

  get deleteRowButtonText(): string {
    return this.args.addRowButtonText ?? 'Delete Row';
  }

  get canAddRow(): boolean {
    return (
      this.args.maxRows === undefined ||
      this._currentNumberOfRows < this.args.maxRows
    );
  }

  get canDeleteRow(): boolean {
    return this._currentNumberOfRows > 1;
  }

  @action onDeleteRowClick(index: number): void {
    // if (this.args.onDeleteRowClick && typeof this.args.onDeleteRowClick === 'function') {
    //   this.args.onDeleteRowClick(index);
    // }

    const newData = this.data.filter((_, i) => i !== index);

    this.data = newData;
    this._currentNumberOfRows = newData.length;
    this._fieldsetElement.focus();
  }

  @action onAddRowClick(): void {
    if (this.canAddRow) {
      this.data = [...this.data, {}];
      this._currentNumberOfRows = this.data.length;
    }
  }
}
