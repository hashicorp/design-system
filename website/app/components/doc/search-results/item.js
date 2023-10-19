/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { htmlSafe } from '@ember/template';

export default class DocSearchResultsItemComponent extends Component {
  get title() {
    let { title } = this.args.result;

    return title;
  }

  get description() {
    let { description } = this.args.result;

    return htmlSafe(description);
  }

  get snippet() {
    let { snippet } = this.args.result;

    return htmlSafe(snippet);
  }

  get link() {
    let { link } = this.args.result;

    return link;
  }

  get thumbnailSrc() {
    let { thumbnailSrc } = this.args.result;

    return `/${thumbnailSrc}`;
  }
}
