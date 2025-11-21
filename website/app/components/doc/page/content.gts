/**
 * Copyright (c) HashiCorp, Inc.
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

export default class DocPageContentComponent extends Component<DocPageContentSignature> {
  get classNames() {
    const classes = ['doc-page-content'];

    // add a class based on the @breakthrough argument
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
