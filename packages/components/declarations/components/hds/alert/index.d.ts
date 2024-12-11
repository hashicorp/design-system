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
import type { HdsIconSignature } from '../icon';
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
        icon?: HdsIconSignature['Args']['name'] | false;
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
export default class HdsAlert extends Component<HdsAlertSignature> {
    private _role?;
    private _ariaLabelledBy?;
    constructor(owner: unknown, args: HdsAlertSignature['Args']);
    get color(): HdsAlertColors;
    get icon(): HdsIconSignature['Args']['name'] | false;
    get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false;
    get iconSize(): HdsIconSignature['Args']['size'];
    get classNames(): string;
    didInsert(element: HTMLDivElement): void;
}
//# sourceMappingURL=index.d.ts.map