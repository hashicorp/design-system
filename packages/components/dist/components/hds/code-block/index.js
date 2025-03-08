import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { next, schedule } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { guidFor } from '@ember/object/internals';
import Prism from 'prismjs';
import { HdsCodeBlockLanguageValues } from './types.js';
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

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  <div class=\"hds-code-block__header\">\n    {{~yield (hash Title=(component \"hds/code-block/title\"))~}}\n    {{~yield (hash Description=(component \"hds/code-block/description\"))~}}\n  </div>\n  <div class=\"hds-code-block__body\">\n    {{! content within pre tag is whitespace-sensitive; do not add new lines! }}\n    <pre\n      class=\"hds-code-block__code\"\n      {{style maxHeight=@maxHeight}}\n      data-line={{@highlightLines}}\n      data-start={{@lineNumberStart}}\n      id={{this._preCodeId}}\n      tabindex=\"0\"\n    ><code {{did-insert this.setPrismCode}} {{did-update this.setPrismCode this.code @language}}>\n        {{~this._prismCode~}}\n      </code></pre>\n\n    {{#if @hasCopyButton}}\n      <Hds::CodeBlock::CopyButton\n        @targetToCopy=\"#{{this._preCodeId}}\"\n        aria-describedby={{this._preCodeId}}\n        @text={{this.copyButtonText}}\n      />\n    {{/if}}\n  </div>\n</div>");

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
  #_prismCode = (i(this, "_prismCode"), undefined);
  /**
   * Generates a unique ID for the code content
   *
   * @param _preCodeId
   */
  _preCodeId = 'pre-code-' + guidFor(this);

  /**
   * @param code
   * @type {string}
   * @description code text content for the CodeBlock
   */
  get code() {
    const code = this.args.value;
    assert('@code for "Hds::CodeBlock" must have a valid value', code !== undefined);
    if (Prism?.plugins?.['NormalizeWhitespace']) {
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
  get language() {
    return this.args.language ?? undefined;
  }

  /**
   * @param hasLineNumbers
   * @type {boolean}
   * @default true
   * @description Displays line numbers if true
   */
  get hasLineNumbers() {
    return this.args.hasLineNumbers ?? true;
  }

  /**
   * @param isStandalone
   * @type {boolean}
   * @default true
   * @description Make CodeBlock container corners appear rounded
   */
  get isStandalone() {
    return this.args.isStandalone ?? true;
  }

  /**
   * @param hasLineWrapping
   * @type {boolean}
   * @default false
   * @description Make text content wrap on multiple lines
   */
  get hasLineWrapping() {
    return this.args.hasLineWrapping ?? false;
  }
  get copyButtonText() {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
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
          this._prismCode = htmlSafe(Prism.util.encode(code).toString());
        }

        // Force prism-line-numbers plugin initialization, required for Prism.highlight usage
        // See https://github.com/PrismJS/prism/issues/1234
        Prism.hooks.run('complete', {
          code,
          element
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
  static {
    n(this.prototype, "setPrismCode", [action]);
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
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsCodeBlock);

export { LANGUAGES, HdsCodeBlock as default };
//# sourceMappingURL=index.js.map
