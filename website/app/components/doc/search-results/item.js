/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { htmlSafe } from '@ember/template';

export default class DocSearchResultsItemComponent extends Component {
  get title() {
    let { title } = this.args.result;

    return title.replace(' | Helios Design System', '');
  }

  // get description() {
  //   let { pagemap } = this.args.result;
  //   let description;

  //   if (pagemap?.metatags?.length > 0) {
  //     description = pagemap.metatags[0]['og:description'];
  //   }

  //   return htmlSafe(description);
  // }

  get snippet() {
    let { htmlSnippet } = this.args.result;

    return htmlSafe(htmlSnippet);
  }

  get link() {
    let { link } = this.args.result;

    return link.replace(/^https:\/\/helios.hashicorp.design\//, '');
  }

  get thumbnailSrc() {
    // TODO handle cases where the pagemap is not returned
    let { pagemap } = this.args.result;
    let src;
    if (pagemap?.cse_image?.length > 0) {
      src = pagemap.cse_image[0].src;
      // src = pagemap.cse_image[0].src.replace(
      //   /^https:\/\/helios.hashicorp.design\//,
      //   ''
      // );
    } else if (pagemap?.cse_thumbnail.lenght > 0) {
      src = pagemap?.cse_thumbnail[0].src;
    } else if (pagemap?.metatags.length > 0) {
      src = pagemap.metatags[0]['og:image'];
    }

    return src;
  }
}
