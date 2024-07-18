/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsFormRadioCardControlPositionValues, HdsFormRadioCardAlignmentValues } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsBadgeSignature } from '../../badge';
import type { HdsFormRadioBaseSignature } from '../radio/base';
import type { HdsFormRadioCardDescriptionSignature } from './description';
import type { HdsFormRadioCardLabelSignature } from './label';
import type { HdsYieldSignature } from '../../yield';
import type { HdsFormRadioCardControlPositions, HdsFormRadioCardAlignments } from './types';
export declare const DEFAULT_CONTROL_POSITION = HdsFormRadioCardControlPositionValues.Bottom;
export declare const DEFAULT_ALIGNMENT = HdsFormRadioCardAlignmentValues.Left;
export declare const CONTROL_POSITIONS: string[];
export declare const ALIGNMENTS: string[];
export interface HdsFormRadioCardSignature {
    Args: {
        name: string;
        value: string;
        checked: boolean;
        disabled: boolean;
        controlPosition: HdsFormRadioCardControlPositions;
        alignment: HdsFormRadioCardAlignments;
        maxWidth: string;
        extraAriaDescribedBy: string;
    };
    Blocks: {
        default: [
            {
                Icon?: ComponentLike<FlightIconSignature>;
                Label?: ComponentLike<HdsFormRadioCardLabelSignature>;
                Badge?: ComponentLike<HdsBadgeSignature>;
                Description?: ComponentLike<HdsFormRadioCardDescriptionSignature>;
                Generic?: ComponentLike<HdsYieldSignature>;
            }
        ];
    };
    Element: HdsFormRadioBaseSignature['Element'];
}
export default class HdsFormRadioCardComponent extends Component<HdsFormRadioCardSignature> {
    /**
     * Sets the position of the control
     * Accepted values: buttom, left
     *
     * @param type
     * @type {string}
     * @default 'bottom'
     */
    get controlPosition(): HdsFormRadioCardControlPositions;
    /**
     * Sets the alignment of the content
     * Accepted values: left, center
     *
     * @param alignnment
     * @type {string}
     * @default 'left'
     */
    get alignment(): HdsFormRadioCardAlignments;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map