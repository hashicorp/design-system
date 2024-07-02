/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsInteractiveSignature {
    Args: {
        href?: string;
        isHrefExternal?: boolean;
        isRouteExternal?: boolean;
        route?: string;
        models?: Array<string | number>;
        model?: string | number;
        query?: Record<string, string>;
        'current-when'?: string;
        replace?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLAnchorElement | HTMLButtonElement;
}
export default class HdsInteractiveComponent extends Component<HdsInteractiveSignature> {
    /**
     * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
     *
     * @param isHrefExternal
     * @type boolean
     * @default true
     */
    get isHrefExternal(): boolean;
    /**
     * Determines if a @route value is "external" (uses the LinkToExternal component instead of LinkTo)
     *
     * @param isRouteExternal
     * @type boolean
     * @default false
     */
    get isRouteExternal(): boolean;
    onKeyUp(event: KeyboardEvent): void;
}
//# sourceMappingURL=index.d.ts.map