/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsButtonSignature } from 'src/components/hds/button';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';

type HTMLInteractiveElement =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

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
  @tracked fullscreenButton: HdsButtonSignature['Element'] | null = null;
  @tracked codeEditorHeader: HTMLElement | null = null;

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

  @action
  registerCodeEditorHeader(element: HTMLElement) {
    this.codeEditorHeader = element;
  }

  @action
  registerFullscreenButton(element: HdsButtonSignature['Element']) {
    this.fullscreenButton = element;
  }

  @action
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  @action
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.isFullscreen) {
        this.toggleFullscreen();
      }

      // if the fullscreen button is present, focus it
      if (this.fullscreenButton != null) {
        return this.fullscreenButton.focus();
      }

      // otherwise, focus the first interactive element in the header
      const interactiveHeaderElements = this.codeEditorHeader?.querySelectorAll(
        'button, a, input, select, textarea'
      );

      if (
        interactiveHeaderElements != null &&
        interactiveHeaderElements.length > 0
      ) {
        return (interactiveHeaderElements[0] as HTMLInteractiveElement).focus();
      } else {
        document.querySelector('body')?.focus();
      }
    }
  }
}
