/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
// import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import type { HdsFormSelectFieldSignature } from '../form/select/field';
import type { HdsFormTextInputFieldSignature } from '../form/text-input/field';
import { hdsBreakpoints } from '../../../utils/hds-breakpoints.ts';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
    maxRows?: number;
    addRowButtonText?: string;
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
        Generic?: ComponentLike<HdsYieldSignature>;
        Select?: ComponentLike<HdsFormSelectFieldSignature>;
        TextInput?: ComponentLike<HdsFormTextInputFieldSignature>;
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
  @tracked private _currentNumberOfRows = this.args.data?.length ?? 0;
  private _desktopMQ: MediaQueryList;
  @tracked private _isDesktop = true;
  private _mediaQueryListener!: (event: MediaQueryListEvent) => void;

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
}
