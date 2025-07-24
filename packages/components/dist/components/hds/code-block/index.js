import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { next, schedule } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import Prism from 'prismjs';
import { HdsCodeBlockLanguageValues } from './types.js';
import './title.js';
import './description.js';
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
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes {{this._setUpCodeObserver}}>\n  <div class=\"hds-code-block__header\">\n    {{~yield (hash Title=(component \"hds/code-block/title\" didInsertNode=this.registerTitleElement))~}}\n    {{~yield\n      (hash Description=(component \"hds/code-block/description\" didInsertNode=this.registerDescriptionElement))\n    ~}}\n  </div>\n  <div class=\"hds-code-block__body\">\n    {{! content within pre tag is whitespace-sensitive; do not add new lines! }}\n    <pre\n      class=\"hds-code-block__code\"\n      {{style maxHeight=this.maxHeight}}\n      data-line={{@highlightLines}}\n      data-start={{@lineNumberStart}}\n      id={{this._preCodeId}}\n      aria-label={{@ariaLabel}}\n      aria-labelledby={{this.ariaLabelledBy}}\n      aria-describedby={{this.ariaDescribedBy}}\n      tabindex=\"0\"\n    ><code {{this._setUpCodeBlockCode}}>\n        {{~this._prismCode~}}\n      </code></pre>\n\n    {{#if @hasCopyButton}}\n      <Hds::CodeBlock::CopyButton\n        @targetToCopy=\"#{{this._preCodeId}}\"\n        aria-describedby={{this._preCodeId}}\n        @text={{this.copyButtonText}}\n        @onCopy={{@onCopy}}\n      />\n    {{/if}}\n  </div>\n  {{#if this.showFooter}}\n    <div class=\"hds-code-block__overlay-footer\">\n      <Hds::Button\n        class=\"hds-code-block__height-toggle-button\"\n        @text={{if this._isExpanded \"Show less code\" \"Show more code\"}}\n        @color=\"secondary\"\n        @icon={{if this._isExpanded \"unfold-close\" \"unfold-open\"}}\n        @size=\"small\"\n        {{on \"click\" this.toggleExpanded}}\n      />\n    </div>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const LANGUAGES = Object.values(HdsCodeBlockLanguageValues);
class HdsCodeBlock extends Component {
  static {
    g(this.prototype, "_prismCode", [tracked], function () {
      return htmlSafe('');
    });
  }
  #_prismCode = (i(this, "_prismCode"), void 0);
  static {
    g(this.prototype, "_isExpanded", [tracked], function () {
      return false;
    });
  }
  #_isExpanded = (i(this, "_isExpanded"), void 0);
  static {
    g(this.prototype, "_codeContentHeight", [tracked], function () {
      return 0;
    });
  }
  #_codeContentHeight = (i(this, "_codeContentHeight"), void 0);
  static {
    g(this.prototype, "_codeContainerHeight", [tracked], function () {
      return 0;
    });
  }
  #_codeContainerHeight = (i(this, "_codeContainerHeight"), void 0);
  static {
    g(this.prototype, "_titleId", [tracked]);
  }
  #_titleId = (i(this, "_titleId"), void 0);
  static {
    g(this.prototype, "_descriptionId", [tracked]);
  }
  #_descriptionId = (i(this, "_descriptionId"), void 0);
  // Generates a unique ID for the code content
  _preCodeId = 'pre-code-' + guidFor(this);
  _preCodeElement;
  _observer;

  // If a code block is hidden from view, and made visible after load, the Prism code needs to be re-run
  _setUpCodeObserver = modifier(element => {
    this._preCodeElement = element.querySelector('.hds-code-block__code');
    this._observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
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
  _setUpCodeBlockCode = modifier(element => {
    this._isExpanded = false; // reset expanded state on updates
    this.setPrismCode(element);
    return () => {};
  });
  get ariaLabelledBy() {
    if (this.args.ariaLabel !== undefined) {
      return;
    }
    return this.args.ariaLabelledBy ?? this._titleId;
  }
  get ariaDescribedBy() {
    return this.args.ariaDescribedBy ?? this._descriptionId;
  }

  // code text content for the CodeBlock
  get code() {
    const code = this.args.value;
    assert('@code for "Hds::CodeBlock" must have a valid value', code !== undefined);
    if (Prism?.plugins?.['NormalizeWhitespace']) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return Prism.plugins['NormalizeWhitespace'].normalize(code);
    }
    return code;
  }
  get maxHeight() {
    return this._isExpanded ? 'none' : this.args.maxHeight;
  }

  // Shows overlay footer if maxHeight is set and the pre tag content height is greater than the pre tag height
  get showFooter() {
    if (this.args.maxHeight) {
      return this._codeContentHeight > this._codeContainerHeight;
    }
    return false;
  }

  // Name of coding language used within CodeBlock for syntax highlighting
  get language() {
    return this.args.language ?? undefined;
  }

  // Displays line numbers if true
  get hasLineNumbers() {
    return this.args.hasLineNumbers ?? true;
  }

  // Make CodeBlock container corners appear rounded (the standalone variation)
  get isStandalone() {
    return this.args.isStandalone ?? true;
  }

  // Make text content wrap to multiple lines
  get hasLineWrapping() {
    return this.args.hasLineWrapping ?? false;
  }
  get copyButtonText() {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
  }
  registerTitleElement(element) {
    this._titleId = element.id;
  }
  static {
    n(this.prototype, "registerTitleElement", [action]);
  }
  registerDescriptionElement(element) {
    this._descriptionId = element.id;
  }
  static {
    n(this.prototype, "registerDescriptionElement", [action]);
  }
  setPrismCode(element) {
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

        // Existing line numbers must be removed in order to be updated correctly
        const lineNumbers = element.querySelector('.line-numbers-rows');
        if (lineNumbers) {
          element.removeChild(lineNumbers);
        }
        if (this.args.highlightLines) {
          this._prismCode = this._addHighlightSrOnlyText(this._prismCode.toString());
        }

        // Force prism-line-numbers plugin initialization, required for Prism.highlight usage
        // See https://github.com/PrismJS/prism/issues/1234
        Prism.hooks.run('complete', {
          code,
          element
        });

        // eslint-disable-next-line ember/no-runloop
        schedule('afterRender', () => {
          this._updateCodeHeights();
          // we need to delay re-evaluating the context for prism plugins for as much as possible, and `afterRender` is the 'latest' we can use in the component lifecycle
          this._updatePrismPlugins();
        });
      });
    }
  }
  static {
    n(this.prototype, "setPrismCode", [action]);
  }
  _updateCodeHeights() {
    if (!this._isExpanded) {
      // Get the actual height & the content height of the preCodeElement
      this._codeContentHeight = this._preCodeElement?.scrollHeight ?? 0;
      this._codeContainerHeight = this._preCodeElement?.clientHeight ?? 0;
    }
  }
  _updatePrismPlugins() {
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
  toggleExpanded() {
    this._isExpanded = !this._isExpanded;
  }

  // Logic for determining where line highlighting starts and ends taken from Prism.js plugin source code
  // Context: https://github.com/PrismJS/prism/blob/19f8de66b0f3a79aedbbf096081a4060fc0e80af/src/plugins/line-highlight/prism-line-highlight.ts#L82
  static {
    n(this.prototype, "toggleExpanded", [action]);
  }
  _addHighlightSrOnlyText(code) {
    const NEW_LINE_EXP = /\n(?!$)/g;
    const lines = code.split(NEW_LINE_EXP);
    const numLines = lines.length;
    const lineOffset = this.args.lineNumberStart ? this.args.lineNumberStart : 0;
    const highlightStart = '<span class="sr-only">highlight start</span>';
    const highlightEnd = '<span class="sr-only">highlight end</span>';
    const ranges = this.args.highlightLines?.replace(/\s+/g, '').split(',').filter(Boolean);
    if (ranges && ranges.length > 0) {
      const highlightedLines = [];
      ranges.forEach(currentRange => {
        const range = currentRange.split('-');
        const start = +range[0] - lineOffset;
        let end = +range[1] || start - lineOffset;
        end = Math.min(numLines, end);
        highlightedLines.push({
          start: start,
          end: end
        });
      });
      highlightedLines.forEach(line => {
        lines[line.start - 1] = highlightStart + lines[line.start - 1];
        lines[line.end - 1] = lines[line.end - 1] + highlightEnd;
      });
      return htmlSafe(lines.join('\n'));
    } else {
      return htmlSafe(code);
    }
  }
  get classNames() {
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
setComponentTemplate(TEMPLATE, HdsCodeBlock);

export { LANGUAGES, HdsCodeBlock as default };
//# sourceMappingURL=index.js.map
