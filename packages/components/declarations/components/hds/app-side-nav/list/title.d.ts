/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsAppSideNavListTitleSignature {
    Args: {
        didInsertTitle?: (titleId: string) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAppSideNavListTitle extends Component<HdsAppSideNavListTitleSignature> {
    private _titleId;
    didInsertTitle(element: HTMLElement): void;
}
//# sourceMappingURL=title.d.ts.map