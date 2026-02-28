/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import HdsButton from '../button/index.gts';
import hdsT from '../../../helpers/hds-t.ts';

import type { HdsButtonSignature } from '../button/index.gts';

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

  <template>
    <HdsButton
      class={{this.className}}
      aria-pressed={{@isFullScreen}}
      @isIconOnly={{true}}
      @color="secondary"
      @size="small"
      @icon={{this.state}}
      @text={{hdsT
        "hds.components.code-editor.full-screen-button.text"
        default="Toggle full screen view"
      }}
      {{on "click" @onToggleFullScreen}}
      ...attributes
    />
  </template>
}
