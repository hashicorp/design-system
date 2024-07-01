/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsAlertColorValues } from './types.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsButtonComponent from '../button';
import type HdsLinkStandaloneComponent from '../link/standalone';
import type { HdsYieldSignature } from '../yield';
import type { HdsAlertColors, HdsAlertTypes } from './types.ts';
import type { HdsAlertTitleSignature } from './title.ts';
import type { HdsAlertDescriptionSignature } from './description.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const TYPES: string[];
export declare const DEFAULT_COLOR = HdsAlertColorValues.Neutral;
export declare const COLORS: string[];
export declare const MAPPING_COLORS_TO_ICONS: {
    readonly neutral: "info";
    readonly highlight: "info";
    readonly success: "check-circle";
    readonly warning: "alert-triangle";
    readonly critical: "alert-diamond";
};
export interface HdsAlertSignature {
    Args: {
        type: HdsAlertTypes;
        color?: HdsAlertColors;
        icon?: FlightIconSignature['Args']['name'] | false;
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    };
    Blocks: {
        default: [
            {
                Title?: ComponentLike<HdsAlertTitleSignature>;
                Description?: ComponentLike<HdsAlertDescriptionSignature>;
                Generic?: ComponentLike<HdsYieldSignature>;
                LinkStandalone?: WithBoundArgs<typeof HdsLinkStandaloneComponent, 'size'>;
                Button?: WithBoundArgs<typeof HdsButtonComponent, 'size'>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAlertComponent extends Component<HdsAlertSignature> {
    role: string;
    ariaLabelledBy?: string;
    constructor(owner: unknown, args: HdsAlertSignature['Args']);
    /**
     * @param color
     * @type {enum}
     * @default neutral
     * @description Determines the color scheme for the alert.
     */
    get color(): "highlight" | "success" | "warning" | "critical" | "neutral" | HdsAlertColorValues.Neutral;
    /**
     * @param icon
     * @type {string}
     * @default null
     * @description The name of the icon to be used.
     */
    get icon(): FlightIconSignature['Args']['name'] | false;
    /**
     * @param onDismiss
     * @type {function}
     * @default () => {}
     */
    get onDismiss(): false | ((event: MouseEvent, ...args: any[]) => void);
    /**
     * @param iconSize
     * @type {string}
     * @description ensures that the correct icon size is used. Automatically calculated.
     */
    get iconSize(): "24" | "16";
    /**
     * Get the class names to apply to the component.
     * @method Alert#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    didInsert(element: HTMLDivElement): void;
}
//# sourceMappingURL=index.d.ts.map