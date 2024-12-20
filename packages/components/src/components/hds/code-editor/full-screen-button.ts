/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../button';

export interface HdsCodeEditorFullScreenButtonSignature {
  Args: {
    isFullScreen: boolean;
    onToggleFullScreen: (isFullScreen: boolean) => void;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsCodeEditorFullScreenButton extends Component<HdsCodeEditorFullScreenButtonSignature> {
  get state(): 'minimize' | 'maximize' {
    return this.args.isFullScreen ? 'minimize' : 'maximize';
  }

  get className() {
    const classes = [
      'hds-code-editor__full-screen-button',
      'hds-code-editor__button',
    ];

    const stateClass = {
      minimize: 'hds-code-editor__full-screen-button--minimize',
      maximize: 'hds-code-editor__full-screen-button--maximize',
    }[this.state];

    classes.push(stateClass);

    return classes.join(' ');
  }

  get icon(): HdsButtonSignature['Args']['icon'] {
    const stateIcons = {
      minimize: 'minimize',
      maximize: 'maximize',
    } as const;

    return stateIcons[this.state];
  }
}
