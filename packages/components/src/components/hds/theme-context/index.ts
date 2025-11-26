/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type Owner from '@ember/owner';

import {
  HdsThemeContextThemesValues,
  HdsThemeContextModesValues,
} from './types.ts';
import type { HdsThemeContexts } from './types.ts';

import type { HdsThemes, HdsModes } from '../../../services/hds-theming.ts';

export interface HdsThemeContextSignature {
  Args: {
    // can be either an `HdsTheme` or an `HdsMode`
    context: HdsThemeContexts;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export const CONTEXTUAL_THEMES: HdsThemes[] = Object.values(
  HdsThemeContextThemesValues
);
export const CONTEXTUAL_MODES: HdsModes[] = Object.values(
  HdsThemeContextModesValues
);
export const CONTEXTUAL_VALUES: HdsThemeContexts[] = [
  ...CONTEXTUAL_THEMES,
  ...CONTEXTUAL_MODES,
];

export default class HdsThemeContext extends Component<HdsThemeContextSignature> {
  constructor(owner: Owner, args: HdsThemeContextSignature['Args']) {
    super(owner, args);

    const { context } = args;

    assert(
      `@context for "Hds::ThemeContext" must be one of the following: ${CONTEXTUAL_VALUES.join(
        ', '
      )}; received: ${context}`,
      CONTEXTUAL_VALUES.includes(context)
    );
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-theme-context'];

    const { context } = this.args;

    // add "theme" or "mode" classes based on the @context arguments
    if (CONTEXTUAL_THEMES.includes(context as HdsThemes)) {
      classes.push(`hds-theme-${context}`);
    } else if (CONTEXTUAL_MODES.includes(context as HdsModes)) {
      classes.push(`hds-mode-${context}`);
    }

    return classes.join(' ');
  }
}
