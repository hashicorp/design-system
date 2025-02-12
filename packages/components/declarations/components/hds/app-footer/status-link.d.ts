/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { SafeString } from '@ember/template/-private/handlebars';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsAppFooterStatusTypes } from './types.ts';
import type { HdsAppFooterLinkSignature } from './link.ts';
import type { HdsIconSignature } from '../icon';
export declare const STATUSES: Record<import("./types.ts").HdsAppFooterStatusValues, {
    text: string;
    iconName: HdsIconSignature["Args"]["name"];
}>;
export interface HdsAppFooterStatusLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        itemStyle?: SafeString;
        status?: HdsAppFooterStatusTypes;
        statusIcon?: HdsIconSignature['Args']['name'];
        statusIconColor?: string;
        text?: string;
    };
    Element: HdsAppFooterLinkSignature['Element'];
}
export default class HdsAppFooterStatusLink extends Component<HdsAppFooterStatusLinkSignature> {
    constructor(owner: unknown, args: HdsInteractiveSignature['Args']);
    /**
     * @param status
     * @type {HdsAppFooterStatusTypes}
     * @description The name of the status which the StatusLink is being set to
     */
    get status(): HdsAppFooterStatusTypes | undefined;
    get statusIcon(): HdsIconSignature['Args']['name'] | undefined;
    /**
     * Get the inline style to apply to the item.
     * @method StatusLink#itemStyle
     * @return {string} The "style" attribute to apply to the item.
     */
    get itemStyle(): SafeString | undefined;
    /**
     * @param text
     * @type {string}
     * @description The text content of the StatusLink
     */
    get text(): string | undefined;
    /**
     * @param href
     * @type {string}
     * @description The href value of the StatusLink
     */
    get href(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=status-link.d.ts.map