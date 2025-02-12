/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsSideNavListTitleSignature {
    Args: {
        didInsertTitle?: (titleId: string) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsSideNavListTitle extends Component<HdsSideNavListTitleSignature> {
    titleId: string;
    didInsertTitle(element: HTMLElement): void;
}
//# sourceMappingURL=title.d.ts.map