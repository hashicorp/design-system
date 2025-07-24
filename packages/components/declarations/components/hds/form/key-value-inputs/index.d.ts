/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import HdsAlertComponent from '../../alert/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormKeyValueInputsDeleteRowButtonComponent from './delete-row-button.ts';
import HdsFormKeyValueInputsFieldComponent from './field.ts';
import HdsFormKeyValueInputsGenericComponent from './generic.ts';
import HdsFormLegendComponent from '../legend/index.ts';
import type { HdsFormKeyValueInputsAddRowButtonSignature } from './add-row-button.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
export interface HdsFormKeyValueInputsSignature {
    Args: {
        data: Array<unknown>;
        extraAriaDescribedBy?: string;
        isOptional?: boolean;
        isRequired?: boolean;
    };
    Blocks: {
        header?: [
            {
                Legend?: WithBoundArgs<typeof HdsFormLegendComponent, 'contextualClass' | 'id' | 'isOptional' | 'isRequired'>;
                HelperText?: WithBoundArgs<typeof HdsFormHelperTextComponent, 'contextualClass' | 'controlId' | 'onInsert'>;
                Generic?: ComponentLike<HdsYieldSignature>;
            }
        ];
        row: [
            {
                Field?: WithBoundArgs<typeof HdsFormKeyValueInputsFieldComponent, 'onInsert' | 'onRemove' | 'rowIndex'>;
                Generic?: WithBoundArgs<typeof HdsFormKeyValueInputsGenericComponent, 'onInsert' | 'onRemove'>;
                DeleteRowButton?: WithBoundArgs<typeof HdsFormKeyValueInputsDeleteRowButtonComponent, 'onInsert' | 'onRemove' | 'returnFocusTo' | 'rowData' | 'rowIndex'>;
                rowData?: unknown;
                rowIndex?: number;
            }
        ];
        footer?: [
            {
                AddRowButton?: ComponentLike<HdsFormKeyValueInputsAddRowButtonSignature>;
                Alert?: WithBoundArgs<typeof HdsAlertComponent, 'color' | 'type'>;
                Error?: WithBoundArgs<typeof HdsFormErrorComponent, 'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'>;
            }
        ];
    };
    Element: HTMLFieldSetElement;
}
export default class HdsFormKeyValueInputs extends Component<HdsFormKeyValueInputsSignature> {
    private _element;
    _gridTemplateColumns: string;
    get glueId(): string;
    _setUpColumn(): void;
    _removeColumn(): void;
    appendDescriptor(element: HTMLElement): void;
    removeDescriptor(element: HTMLElement): void;
    private _setUpKeyValueInputs;
    private _updateColumns;
}
