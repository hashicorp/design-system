/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import DocScrollToTop from 'website/components/doc/scroll-to-top';

interface DocPageContentSignature {
  Args: {
    breakthrough?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocPageContent extends Component<DocPageContentSignature> {
  get classNames() {
    const classes = ['doc-page-content'];

    if (this.args.breakthrough) {
      classes.push(`doc-page-content--breakthrough`);
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield}}
    </div>
    <DocScrollToTop />
  </template>
}
