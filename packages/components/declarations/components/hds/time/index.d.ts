/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { DisplayType } from '../../../services/hds-time-types.ts';
import type TimeService from '../../../services/hds-time';
export interface HdsTimeSignature {
    Args: {
        date?: Date | string;
        startDate?: Date | string;
        endDate?: Date | string;
        display?: 'utc' | 'relative' | 'friendly-only' | 'friendly-local' | 'friendly-relative';
        isOpen?: boolean;
        hasTooltip?: boolean;
        isoUtcString?: string;
    };
    Element: HTMLElement;
}
export default class HdsTime extends Component<HdsTimeSignature> {
    readonly hdsTime: TimeService;
    get date(): Date | undefined;
    get startDate(): Date | undefined;
    get endDate(): Date | undefined;
    get isValidDate(): boolean;
    get isValidDateRange(): boolean;
    get hasTooltip(): boolean;
    get isoUtcString(): string | undefined;
    get rangeIsoUtcString(): string;
    get display(): DisplayType;
    get isOpen(): boolean;
    didInsertNode(): void;
    willDestroyNode(): void;
}
//# sourceMappingURL=index.d.ts.map