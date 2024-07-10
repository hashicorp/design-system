/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { iconNames } from '@hashicorp/flight-icons/svg';

import type { IconName } from '@hashicorp/flight-icons/svg';

export interface HdsIconSignature {
  Args: {
    name?: IconName;
    color?: string;
    size?: '16' | '24';
    stretched?: boolean;
    isInline?: boolean;
    title?: string;
  };
  Element: SVGElement;
}

export default class HdsIcon extends Component<HdsIconSignature> {
  constructor(owner: unknown, args: HdsIconSignature['Args']) {
    super(owner, args);

    if (!this.args.name) {
      assert('Please provide to <Hds::Icon> a value for @name');
    } else if (!iconNames.includes(this.args.name)) {
      assert(
        `The icon @name "${this.args.name}" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`
      );
    }
  }

  get isInline() {
    return this.args.isInline ?? false;
  }

  get color() {
    return this.args.color ?? 'currentColor';
  }

  iconId = 'icon-' + guidFor(this);

  get name() {
    return this.args.name;
  }

  get size() {
    return this.args.size ?? '16';
  }

  get svgSize() {
    return {
      width: this.args.stretched ? '100%' : this.size,
      height: this.args.stretched ? '100%' : this.size,
    };
  }

  titleId = 'title-' + guidFor(this);

  get title() {
    return this.args.title ?? null;
  }

  get role() {
    return this.args.title ? 'img' : null;
  }

  get ariaLabelledby() {
    return this.args.title ? this.titleId : null;
  }

  get classNames() {
    const classes = ['hds-icon'];

    // add a class based on the @name argument
    classes.push(`hds-icon-${this.name}`);

    if (this.isInline) {
      classes.push('hds-icon--is-inline');
    }

    // add an extra class to control the animation (depends on the icon)
    if (this.name === 'loading') {
      classes.push('hds-icon--animation-loading');
    } else if (this.name === 'running') {
      classes.push('hds-icon--animation-running');
    }

    return classes.join(' ');
  }
}
