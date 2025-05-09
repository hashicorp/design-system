/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { next, schedule } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { guidFor } from '@ember/object/internals';

import Prism from 'prismjs';

import type { SafeString } from '@ember/template';
import type { ComponentLike } from '@glint/template';

import type { HdsCodeBlockTitleSignature } from './title';
import type { HdsCodeBlockDescriptionSignature } from './description';
import { HdsCodeBlockLanguageValues } from './types.ts';
import type { HdsCodeBlockLanguages } from './types.ts';
import type { HdsCopyButtonSignature } from '../copy/button/index.ts';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-hcl';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-log';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-yaml';

// These imports are required to overcome a global variable clash in Helios website
// where language import are overriden by the Prism instance in `CodeBlock`
// Note that `prism-handlebars` is dependant on `prism-markup-templating`
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';

export const LANGUAGES: string[] = Object.values(HdsCodeBlockLanguageValues);

export interface HdsCodeBlockSignature {
  Args: {
    hasCopyButton?: boolean;
    hasLineNumbers?: boolean;
    hasLineWrapping?: boolean;
    highlightLines?: string;
    lineNumberStart?: number;
    isStandalone?: boolean;
    language?: HdsCodeBlockLanguages;
    maxHeight?: string;
    value: string;
    copyButtonText?: HdsCopyButtonSignature['Args']['text'];
    onCopy?: HdsCopyButtonSignature['Args']['onSuccess'];
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsCodeBlockTitleSignature>;
        Description?: ComponentLike<HdsCodeBlockDescriptionSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeBlock extends Component<HdsCodeBlockSignature> {
  @tracked private _prismCode: SafeString = htmlSafe('');

  /**
   * Generates a unique ID for the code content
   *
   * @param _preCodeId
   */
  private _preCodeId = 'pre-code-' + guidFor(this);

  /**
   * @param code
   * @type {string}
   * @description code text content for the CodeBlock
   */
  get code(): string {
    const code = this.args.value;

    assert(
      '@code for "Hds::CodeBlock" must have a valid value',
      code !== undefined
    );

    if (Prism?.plugins?.['NormalizeWhitespace']) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return Prism.plugins['NormalizeWhitespace'].normalize(code);
    }

    return code;
  }

  /**
   * @param language
   * @type {string}
   * @default undefined
   * @description name of coding language used within CodeBlock for syntax highlighting
   */
  get language(): HdsCodeBlockLanguages | undefined {
    return this.args.language ?? undefined;
  }

  /**
   * @param hasLineNumbers
   * @type {boolean}
   * @default true
   * @description Displays line numbers if true
   */
  get hasLineNumbers(): boolean {
    return this.args.hasLineNumbers ?? true;
  }

  /**
   * @param isStandalone
   * @type {boolean}
   * @default true
   * @description Make CodeBlock container corners appear rounded
   */
  get isStandalone(): boolean {
    return this.args.isStandalone ?? true;
  }

  /**
   * @param hasLineWrapping
   * @type {boolean}
   * @default false
   * @description Make text content wrap on multiple lines
   */
  get hasLineWrapping(): boolean {
    return this.args.hasLineWrapping ?? false;
  }

  get copyButtonText(): HdsCopyButtonSignature['Args']['text'] {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
  }

  @action
  setPrismCode(element: HTMLElement): void {
    const code = this.code;
    const language = this.language;
    const grammar = language ? Prism.languages[language] : undefined;

    if (code) {
      // eslint-disable-next-line ember/no-runloop
      next(() => {
        if (language && grammar) {
          this._prismCode = htmlSafe(Prism.highlight(code, grammar, language));
        } else {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          this._prismCode = htmlSafe(Prism.util.encode(code).toString());
        }

        // Force prism-line-numbers plugin initialization, required for Prism.highlight usage
        // See https://github.com/PrismJS/prism/issues/1234
        Prism.hooks.run('complete', {
          code,
          element,
        });

        // Force prism-line-highlight plugin initialization
        // Context: https://github.com/hashicorp/design-system/pull/1749#discussion_r1374288785
        if (this.args.highlightLines) {
          // we need to delay re-evaluating the context for prism-line-highlight for as much as possible, and `afterRender` is the 'latest' we can use in the component lifecycle
          // eslint-disable-next-line ember/no-runloop
          schedule('afterRender', () => {
            // we piggy-back on the plugin's `resize` event listener to trigger a new call of the `highlightLines` function: https://github.com/PrismJS/prism/blob/master/plugins/line-highlight/prism-line-highlight.js#L337
            if (window) window.dispatchEvent(new Event('resize'));
          });
        }
      });
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-block', 'hds-code-block--theme-dark'];

    if (this.language) {
      classes.push(`language-${this.language}`);
    }

    if (this.isStandalone === true) {
      classes.push('hds-code-block--is-standalone');
    }

    if (this.hasLineWrapping === true) {
      classes.push('hds-code-block--has-line-wrapping');
    }

    // Note: Prism.js is using the specific class name "line-numbers" to determine implementation of line numbers in the UI
    if (this.hasLineNumbers) {
      classes.push('line-numbers');
    }

    return classes.join(' ');
  }
}
