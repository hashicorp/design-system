/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type Component from '@glimmer/component';
interface AriaDescribedByArgs {
    Args: {
        extraAriaDescribedBy: string;
    };
}
interface AriaDescribedByComponent extends Component<AriaDescribedByArgs> {
    __ARIA_DESCRIPTION_IDS__: string[];
    ariaDescribedBy: string;
}
type ClassOf<T> = new () => T;
export declare function ariaDescribedBy(BaseComponent: ClassOf<AriaDescribedByComponent>): ClassOf<AriaDescribedByComponent>;
export declare function registerAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export declare function unregisterAriaDescriptionElement(component: AriaDescribedByComponent, element: HTMLElement): void;
export {};
//# sourceMappingURL=hds-aria-described-by.d.ts.map