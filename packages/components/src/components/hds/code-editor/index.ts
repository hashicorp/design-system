/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsButtonSignature } from 'src/components/hds/button';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';

export interface HdsCodeEditorSignature {
  Args: {
    hasCopyButton?: boolean;
    canExpand?: boolean;
    description?: string;
    language?: HdsCodeEditorModifierSignature['Args']['Named']['language'];
    options?: unknown[];
    title?: string;
    value?: string;
    onInput?: (newVal: string) => void;
  };
  Blocks: {
    default: [
      {
        Description?: ComponentLike<HdsCodeEditorDescriptionSignature>;
        Title?: ComponentLike<HdsCodeEditorTitleSignature>;
        ToolbarButton?: ComponentLike<HdsButtonSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  @tracked isFullscreen = false;

  get classNames(): string {
    const classes = ['hds-code-editor'];

    if (this.isFullscreen) {
      classes.push('hds-code-editor--is-fullscreen');
    }

    return classes.join(' ');
  }

  get hasHeaderInfo(): boolean {
    return this.args.title !== undefined || this.args.description !== undefined;
  }

  get hasToolbarAction() {
    return this.args.hasCopyButton || this.args.canExpand;
  }
}
