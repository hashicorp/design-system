/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../button';

export interface HdsCodeEditorFullScreenButtonSignature {
  Args: {
    isFullScreen: boolean;
    onToggleFullScreen: () => void;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsCodeEditorFullScreenButton extends Component<HdsCodeEditorFullScreenButtonSignature> {
  get state(): 'minimize' | 'maximize' {
    return this.args.isFullScreen ? 'minimize' : 'maximize';
  }

  get className(): string {
    const classes = [
      'hds-code-editor__full-screen-button',
      'hds-code-editor__button',
    ];

    const stateClass = `hds-code-editor__full-screen-button--${this.state}`;

    classes.push(stateClass);

    return classes.join(' ');
  }
}
