/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import { guidFor } from '@ember/object/internals';

import Prism from 'prismjs';

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

export default class HdsCodeBlockIndexComponent extends Component {
  @tracked prismCode = '';

  /**
   * Generates a unique ID for the code content
   *
   * @param preCodeId
   */
  preCodeId = 'pre-code-' + guidFor(this);

  /**
   * @param code
   * @type {string}
   * @description code text content for the CodeBlock
   */
  get code() {
    const code = this.args.value;

    assert(
      '@code for "Hds::CodeBlock" must have a valid value',
      code !== undefined
    );

    if (Prism?.plugins?.NormalizeWhitespace) {
      return Prism.plugins.NormalizeWhitespace.normalize(code);
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

  @action
  setPrismCode(element) {
    const code = this.code;
    const language = this.language;
    const grammar = Prism.languages[language];

    if (code) {
      if (language && grammar) {
        this.prismCode = htmlSafe(Prism.highlight(code, grammar, language));
      } else {
        this.prismCode = htmlSafe(Prism.util.encode(code));
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
        setTimeout(() => {
          // we piggy-back on the plugin's `resize` event listener to trigger a new call of the `highlightLines` function: https://github.com/PrismJS/prism/blob/master/plugins/line-highlight/prism-line-highlight.js#L337
          if (window) window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    let classes = ['hds-code-block', 'hds-code-block--theme-dark'];

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
    if (this.hasLineNumbers || this.args.highlightLines) {
      classes.push('line-numbers');
    }

    return classes.join(' ');
  }
}
