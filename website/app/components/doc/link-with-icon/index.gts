/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import docTrackEvent from 'website/modifiers/doc-track-event';

interface DocLinkWithIconSignature {
  Args: {
    eventName: string;
    fillParent?: boolean;
    href?: string;
    icon: HdsIconSignature['Args']['name'];
    isAnimated?: boolean;
    label: string;
    model?: unknown;
    models?: unknown[];
    route?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement | HTMLLinkElement;
}

export default class DocLinkWithIcon extends Component<DocLinkWithIconSignature> {
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
    const classes = ['doc-link-with-icon'];

    if (this.args.isAnimated) {
      classes.push(`doc-link-with-icon--is-animated`);
    }

    if (this.args.fillParent) {
      classes.push(`doc-link-with-icon--fill-parent`);
    }

    return classes.join(' ');
  }

  <template>
    {{#if @route}}
      <LinkTo
        class={{this.classNames}}
        @route={{@route}}
        @models={{this.models}}
        ...attributes
        {{docTrackEvent eventName=@eventName}}
      >
        {{@label}}
        <HdsIcon class="doc-link-with-icon__icon" @name={{@icon}} />
      </LinkTo>
    {{/if}}
    {{#if @href}}
      <a
        class={{this.classNames}}
        href={{@href}}
        target="_blank"
        rel="noopener noreferrer"
        {{docTrackEvent eventName=@eventName}}
        ...attributes
      >
        {{@label}}
        <HdsIcon class="doc-link-with-icon__icon" @name={{@icon}} />
      </a>
    {{/if}}
  </template>
}
