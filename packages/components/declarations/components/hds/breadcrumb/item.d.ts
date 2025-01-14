/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { SafeString } from '@ember/template/-private/handlebars';
import type { HdsIconSignature } from '../icon';
export interface HdsBreadcrumbItemSignature {
    Args: {
        current?: boolean;
        maxWidth?: string;
        text: string;
        isRouteExternal?: boolean;
        icon?: HdsIconSignature['Args']['name'];
        route?: string;
        models?: Array<string | number>;
        model?: string | number;
        query?: Record<string, string>;
        'current-when'?: string;
        replace?: boolean;
    };
    Element: HTMLLIElement;
}
export default class HdsBreadcrumbItem extends Component<HdsBreadcrumbItemSignature> {
    /**
     * @param maxWidth
     * @type {string}
     * @default undefined
     * @description A parameter that can be applied to an "item" to limit its max-width
     */
    get maxWidth(): string | undefined;
    /**
     * Get the inline style to apply to the item.
     * @method BreadcrumbItem#itemStyle
     * @return {string} The "style" attribute to apply to the item.
     */
    get itemStyle(): SafeString | undefined;
    /**
     * Get the class names to apply to the component.
     * @method BreadcrumbItem#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=item.d.ts.map