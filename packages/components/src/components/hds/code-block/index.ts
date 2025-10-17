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
import { modifier } from 'ember-modifier';

import Prism from 'prismjs';

import type { SafeString } from '@ember/template';
import type { WithBoundArgs } from '@glint/template';

import type { HdsCodeBlockTitleSignature } from './title';
import type { HdsCodeBlockDescriptionSignature } from './description';
import { HdsCodeBlockLanguageValues } from './types.ts';
import type { HdsCodeBlockLanguages } from './types.ts';
import type { HdsCopyButtonSignature } from '../copy/button/index.ts';

import HdsCodeBlockTitleComponent from './title.ts';
import HdsCodeBlockDescriptionComponent from './description.ts';

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

export const LANGUAGES: HdsCodeBlockLanguages[] = Object.values(
  HdsCodeBlockLanguageValues
);

export interface HdsCodeBlockSignature {
  Args: {
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
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
    copySuccessMessageText?: HdsCopyButtonSignature['Args']['ariaMessageText'];
  };
  Blocks: {
    default: [
      {
        Title?: WithBoundArgs<
          typeof HdsCodeBlockTitleComponent,
          'didInsertNode'
        >;
        Description?: WithBoundArgs<
          typeof HdsCodeBlockDescriptionComponent,
          'didInsertNode'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeBlock extends Component<HdsCodeBlockSignature> {
  @tracked private _prismCode: SafeString = htmlSafe('');
  @tracked private _isExpanded: boolean = false;
  @tracked private _codeContentHeight: number = 0;
  @tracked private _codeContainerHeight: number = 0;
  @tracked private _titleId: string | undefined;
  @tracked private _descriptionId: string | undefined;

  // Generates a unique ID for the code content
  private _preCodeId = 'pre-code-' + guidFor(this);
  private _preCodeElement!: HTMLPreElement;
  private _observer!: ResizeObserver;

  // If a code block is hidden from view, and made visible after load, the Prism code needs to be re-run
  private _setUpCodeObserver = modifier((element: HTMLElement) => {
    this._preCodeElement = element.querySelector(
      '.hds-code-block__code'
    ) as HTMLPreElement;
    this._observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.contentBoxSize) {
          this._updateCodeHeights();
          this._updatePrismPlugins();
        }
      });
    });
    this._observer.observe(element);

    return () => {
      this._observer.disconnect();
    };
  });

  private _setUpCodeBlockCode = modifier((element: HTMLElement) => {
    this._isExpanded = false; // reset expanded state on updates
    this.setPrismCode(element);
    return () => {};
  });

  get ariaLabelledBy(): string | undefined {
    if (this.args.ariaLabel !== undefined) {
      return;
    }

    return this.args.ariaLabelledBy ?? this._titleId;
  }

  get ariaDescribedBy(): string | undefined {
    return this.args.ariaDescribedBy ?? this._descriptionId;
  }

  // code text content for the CodeBlock
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

  get maxHeight(): string | undefined {
    return this._isExpanded ? 'none' : this.args.maxHeight;
  }

  // Shows overlay footer if maxHeight is set and the pre tag content height is greater than the pre tag height
  get showFooter(): boolean {
    if (this.args.maxHeight) {
      return this._codeContentHeight > this._codeContainerHeight;
    }
    return false;
  }

  // Name of coding language used within CodeBlock for syntax highlighting
  get language(): HdsCodeBlockLanguages | undefined {
    return this.args.language ?? undefined;
  }

  // Displays line numbers if true
  get hasLineNumbers(): boolean {
    return this.args.hasLineNumbers ?? true;
  }

  // Make CodeBlock container corners appear rounded (the standalone variation)
  get isStandalone(): boolean {
    return this.args.isStandalone ?? true;
  }

  // Make text content wrap to multiple lines
  get hasLineWrapping(): boolean {
    return this.args.hasLineWrapping ?? false;
  }

  get copyButtonText(): HdsCopyButtonSignature['Args']['text'] {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
  }

  @action
  registerTitleElement(element: HdsCodeBlockTitleSignature['Element']): void {
    this._titleId = element.id;
  }

  @action
  registerDescriptionElement(
    element: HdsCodeBlockDescriptionSignature['Element']
  ): void {
    this._descriptionId = element.id;
  }

  @action
  setPrismCode(element: HTMLElement): void {
    const code = this.code;
    const language = this.language;
    const grammar = language ? Prism.languages[language] : undefined;

    if (code) {
      // eslint-disable-next-line ember/no-runloop
      next((): void => {
        if (language && grammar) {
          this._prismCode = htmlSafe(Prism.highlight(code, grammar, language));
        } else {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          this._prismCode = htmlSafe(Prism.util.encode(code).toString());
        }

        // Existing line numbers must be removed in order to be updated correctly
        const lineNumbers = element.querySelector(
          '.line-numbers-rows'
        ) as HTMLElement;
        if (lineNumbers) {
          element.removeChild(lineNumbers);
        }

        if (this.args.highlightLines) {
          this._prismCode = this._addHighlightSrOnlyText(
            this._prismCode.toString()
          );
        }

        // Force prism-line-numbers plugin initialization, required for Prism.highlight usage
        // See https://github.com/PrismJS/prism/issues/1234
        Prism.hooks.run('complete', {
          code,
          element,
        });

        // eslint-disable-next-line ember/no-runloop
        schedule('afterRender', (): void => {
          this._updateCodeHeights();
          // we need to delay re-evaluating the context for prism plugins for as much as possible, and `afterRender` is the 'latest' we can use in the component lifecycle
          this._updatePrismPlugins();
        });
      });
    }
  }

  private _updateCodeHeights(): void {
    if (!this._isExpanded) {
      // Get the actual height & the content height of the preCodeElement
      this._codeContentHeight = this._preCodeElement?.scrollHeight ?? 0;
      this._codeContainerHeight = this._preCodeElement?.clientHeight ?? 0;
    }
  }

  private _updatePrismPlugins(): void {
    if (this.hasLineNumbers && Prism?.plugins?.['lineNumbers']) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      Prism.plugins['lineNumbers'].resize(this._preCodeElement);
    }

    // Force prism-line-highlight plugin initialization
    // Context: https://github.com/hashicorp/design-system/pull/1749#discussion_r1374288785
    if (this.args.highlightLines) {
      // we piggy-back on the plugin's `resize` event listener to trigger a new call of the `highlightLines` function: https://github.com/PrismJS/prism/blob/master/plugins/line-highlight/prism-line-highlight.js#L337
      if (window) window.dispatchEvent(new Event('resize'));
    }
  }

  @action
  toggleExpanded(): void {
    this._isExpanded = !this._isExpanded;
  }

  // Logic for determining where line highlighting starts and ends taken from Prism.js plugin source code
  // Context: https://github.com/PrismJS/prism/blob/19f8de66b0f3a79aedbbf096081a4060fc0e80af/src/plugins/line-highlight/prism-line-highlight.ts#L82
  private _addHighlightSrOnlyText(code: string): SafeString {
    const NEW_LINE_EXP = /\n(?!$)/g;
    const lines = code.split(NEW_LINE_EXP);
    const numLines = lines.length;
    const lineOffset = this.args.lineNumberStart
      ? this.args.lineNumberStart
      : 0;

    const highlightStart = '<span class="sr-only">highlight start</span>';
    const highlightEnd = '<span class="sr-only">highlight end</span>';

    const ranges = this.args.highlightLines
      ?.replace(/\s+/g, '')
      .split(',')
      .filter(Boolean);

    if (ranges && ranges.length > 0) {
      const highlightedLines = [] as { start: number; end: number }[];

      ranges.forEach((currentRange) => {
        const range = currentRange.split('-');
        const start = +range[0]! - lineOffset;
        let end = +range[1]! || start - lineOffset;
        end = Math.min(numLines, end);
        highlightedLines.push({
          start: start,
          end: end,
        });
      });

      highlightedLines.forEach((line) => {
        lines[line.start - 1] = highlightStart + lines[line.start - 1];
        lines[line.end - 1] = lines[line.end - 1] + highlightEnd;
      });

      return htmlSafe(lines.join('\n'));
    } else {
      return htmlSafe(code);
    }
  }

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

    if (this.showFooter) {
      classes.push('hds-code-block--has-overlay-footer');
    }

    if (this._isExpanded) {
      classes.push('hds-code-block--is-expanded');
    }

    return classes.join(' ');
  }
}
