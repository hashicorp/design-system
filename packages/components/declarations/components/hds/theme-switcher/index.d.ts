/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormSelectBaseSignature } from '../form/select/base.ts';
import type HdsThemingService from '../../../services/hds-theming.ts';
import { type HdsThemes } from '../../../services/hds-theming.ts';
export interface HdsThemeSwitcherSignature {
    Args: {};
    Element: HdsFormSelectBaseSignature['Element'];
}
export default class HdsThemeSwitcher extends Component<HdsThemeSwitcherSignature> {
    readonly hdsTheming: HdsThemingService;
    _selectedTheme: HdsThemes;
    constructor(owner: unknown, args: HdsThemeSwitcherSignature['Args']);
    _onChangePageTheme(event: Event): void;
}
//# sourceMappingURL=index.d.ts.map