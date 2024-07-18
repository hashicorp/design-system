/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type Component from '@glimmer/component';
import type { HdsFormFieldSignature } from '../components/hds/form/field/';
import type { HdsFormFieldsetSignature } from '../components/hds/form/fieldset/';
type AriaDescribedByArgs = HdsFormFieldSignature & HdsFormFieldsetSignature;
interface AriaDescribedByComponent extends Component<AriaDescribedByArgs> {
    __ARIA_DESCRIPTION_IDS__?: string[];
    ariaDescribedBy?: string;
}
type ClassOf<T> = new (owner: unknown, ...args: any[]) => T;
export declare function ariaDescribedBy(BaseComponent: ClassOf<AriaDescribedByComponent>): ClassOf<AriaDescribedByComponent>;
export declare function registerAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export declare function unregisterAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export {};
//# sourceMappingURL=hds-aria-described-by.d.ts.map