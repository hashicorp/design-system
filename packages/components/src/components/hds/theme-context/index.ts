/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type Owner from '@ember/owner';

import type { HdsContextualThemes } from './types.ts';
// import { HdsContextualThemeValues } from './types.ts';

export interface HdsThemeContextSignature {
  Args: {
    // it can be an `HdsTheme` or an `HdsMode`
    context: HdsContextualThemes;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

// TODO understand how to make this work!
// export const CONTEXTUAL_THEMES: HdsContextualThemes[] = Object.values(
//   HdsContextualThemeValues
// );
export const CONTEXTUAL_THEMES = [
  'default',
  'system',
  'light',
  'dark',
];

export const CONTEXTUAL_MODES = [
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
];

export const CONTEXTUAL_VALUES = [
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
    if (CONTEXTUAL_THEMES.includes(context)) {
      classes.push(`hds-theme-${context}`);
    } else if (CONTEXTUAL_MODES.includes(context)) {
      classes.push(`hds-mode-${context}`);
    }

    return classes.join(' ');
  }
}
