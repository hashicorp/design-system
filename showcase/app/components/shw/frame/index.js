/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';

export default class FrameComponent extends Component {
  get src() {
    const { src } = this.args;

    // for simplicity, we accept only absolute URLs
    if (!src.match(/$\//)) {
      assert(
        `@src for "Shw::Frame" must be an absolute path (starting with '/') - Provided: ${src}`,
        true
      );
    }

    return htmlSafe(src);
  }

  get width() {
    let { width = '100%' } = this.args;

    // convert everything to string
    width = width.toString();

    // we accept only px or percentage
    assert(
      `@width for "Shw::Frame" must be a number or a percentage - Provided: ${width}`,
      width.match(/^[\d]+%?$/)
    );

    return width.match(/^[\d]+$/) ? `${width}px` : width;
  }

  get height() {
    let { height = '400' } = this.args;

    // convert everything to string
    height = height.toString();

    // we accept only px
    assert(
      `@height for "Shw::Frame" must be a number - Provided: ${height}`,
      height.match(/^[\d]+?$/)
    );

    return `${height}px`;
  }

  get title() {
    return this.args.title ?? this.args.label ?? 'demo frame';
  }

  get style() {
    let styles = [];
    if (this.width) {
      styles.push(`--iframe-width: ${this.width}`);
    }
    if (this.height) {
      styles.push(`--iframe-height: ${this.height}`);
    }

    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }
}
