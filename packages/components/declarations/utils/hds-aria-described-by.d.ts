/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type Component from '@glimmer/component';
import type { HdsFormFieldSignature } from '../components/hds/form/field/';
import type { HdsFormFieldsetSignature } from '../components/hds/form/fieldset/';
import type { HdsFormKeyValueInputsFieldSignature } from '../components/hds/form/key-value-inputs/field';
import type { HdsFormKeyValueInputsSignature } from '../components/hds/form/key-value-inputs/index';
type AriaDescribedByArgs = HdsFormFieldSignature | HdsFormFieldsetSignature | HdsFormKeyValueInputsFieldSignature | HdsFormKeyValueInputsSignature;
export interface AriaDescribedByComponent extends Component<AriaDescribedByArgs> {
    __ARIA_DESCRIPTION_IDS__?: string[];
    ariaDescribedBy?: string;
}
type ClassOf<T> = new (owner: unknown, ...args: any[]) => T;
export declare function ariaDescribedBy(BaseComponent: ClassOf<AriaDescribedByComponent>): ClassOf<AriaDescribedByComponent>;
export declare function registerAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export declare function unregisterAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export {};
