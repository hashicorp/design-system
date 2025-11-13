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
    theme: HdsContextualThemes;
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
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
];

export default class HdsThemeContext extends Component<HdsThemeContextSignature> {
  constructor(owner: Owner, args: HdsThemeContextSignature['Args']) {
    super(owner, args);

    const { theme } = args;

    assert(
      `@theme for "Hds::ThemeContext" must be one of the following: ${CONTEXTUAL_THEMES.join(
        ', '
      )}; received: ${theme}`,
      CONTEXTUAL_THEMES.includes(theme)
    );
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-theme-context'];

    // add "theme" classes based on the @theme arguments
    classes.push(`hds-theme-${this.args.theme}`);

    return classes.join(' ');
  }
}
