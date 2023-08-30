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
//import loadLanguages from 'prismjs/components/';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-shell-session';

import 'prismjs/plugins/line-numbers/prism-line-numbers';

setup(Prism);

export default class HdsCodeBlockIndexComponent extends Component {
  @tracked prismCode = '';

  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

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

  get language() {
    return this.args.language ?? 'javascript';
  }

  get languageClass() {
    return `language-${this.language}`;
  }

  /**
   * @param readOnly
   * @type {boolean}
   * @default true
   * @description If true, then content will be editable
   */
  get readOnly() {
    return this.args.readOnly ?? true;
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
    let classes = ['hds-code-block'];

    if (this.language) {
      classes.push(`language-${this.language}`);
    }

    if (this.args.lineWrapping === true) {
      classes.push('hds-code-block--has-line-wrapping');
    }

    if (this.args.lineNumbers === true) {
      classes.push('line-numbers');
    }

    return classes.join(' ');
  }
}
