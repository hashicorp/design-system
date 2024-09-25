/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsBreadcrumbSignature {
    Args: {
        ariaLabel?: string;
        itemsCanWrap?: boolean;
        didInsert?: () => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class HdsBreadcrumb extends Component<HdsBreadcrumbSignature> {
    /**
     * @param onDidInsert
     * @type {function}
     * @default () => {}
     */
    get didInsert(): () => void;
    /**
     * @param itemsCanWrap
     * @type {boolean}
     * @default true
     */
    get itemsCanWrap(): boolean;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'breadcrumbs'
     */
    get ariaLabel(): string;
    /**
     * Get the class names to apply to the component.
     * @method Breadcrumb#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map