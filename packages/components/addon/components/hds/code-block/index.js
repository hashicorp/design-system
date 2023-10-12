/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import Prism from 'prismjs';
import { setup } from 'prismjs-glimmer';
import { guidFor } from '@ember/object/internals';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

// Importing language individually because autoloader isn't currently working
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-shell-session';

// languages_path isn't working so autoloader isn't working
// https://prismjs.com/plugins/autoloader/
import 'prismjs/plugins/autoloader/prism-autoloader';

setup(Prism);
// Path is supposed to normally not need to be specified but it's not working either way currently
// Prism.plugins.autoloader.languages_path = 'prismjs/components';

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
   * @default 'javascript'
   * @description name of coding language used within CodeBlock for syntax highlighting
   */
  get language() {
    return this.args.language ?? 'javascript';
  }

  get languageClass() {
    return `language-${this.language}`;
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
   * @param isReadOnly
   * @type {boolean}
   * @default true
   * @description Make text content non-editable / editable
   */
  get isReadOnly() {
    return this.args.isReadOnly ?? true;
  }

  /**
   * @param isRounded
   * @type {boolean}
   * @default true
   * @description Make CodeBlock container corners appear rounded
   */
  get isRounded() {
    return this.args.isRounded ?? true;
  }

  @action
  setPrismCode(element) {
    const code = this.code;
    const language = this.language;
    const grammar = Prism.languages[language];

    if (code && language && grammar) {
      this.prismCode = htmlSafe(Prism.highlight(code, grammar, language));
    } else {
      this.prismCode = '';
    }

    // Force plugin initialization, required for Prism.highlight usage.
    // See https://github.com/PrismJS/prism/issues/1234
    Prism.hooks.run('complete', {
      code,
      element,
    });
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // Currently theres is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    let classes = ['hds-code-block', 'hds-code-block--theme-dark'];

    if (this.language) {
      classes.push(`language-${this.language}`);
    }

    if (this.args.hasCopyButton) {
      classes.push('hds-code-block--has-copy-button');
    }

    if (this.isRounded === true) {
      classes.push('hds-code-block--is-rounded');
    }

    if (this.args.hasLineWrapping === true) {
      classes.push('hds-code-block--has-line-wrapping');
    }

    // Note: Prism.js is using the specific class name "line-numbers" to determine implementation of line numbers in the UI
    if (this.hasLineNumbers || this.args.highlightLines) {
      classes.push('line-numbers');
    }

    return classes.join(' ');
  }
}
