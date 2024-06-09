/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class DocLinkWithIconComponent extends Component {
  get models() {
    // we need to use this trick to overcome the problem of `<LinkTo>` going beserk if we pass
    // a `@model` argument which is undefined (while an empty `@models` array is OK)
    if (this.args.model) {
      return [this.args.model];
    } else if (this.args.models) {
      return this.args.models;
    } else {
      return [];
    }
  }

  get classNames() {
    let classes = ['doc-link-with-icon'];

    // add a class based on the @isAnimated argument
    if (this.args.isAnimated) {
      classes.push(`doc-link-with-icon--is-animated`);
    }

    // add a class based on the @fillParent argument
    if (this.args.fillParent) {
      classes.push(`doc-link-with-icon--fill-parent`);
    }

    return classes.join(' ');
  }
}
