/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';

import DocTableOfContents from 'website/components/doc/table-of-contents';

export default class DocTocCollapsibleItem extends Component {
  @tracked isOpen;

  constructor(owner, args) {
    super(owner, args);
    this.isOpen = this.args.item.isOpen ?? false;
  }

  toggleIsOpen = () => {
    this.isOpen = !this.isOpen;
  };

  contentId = 'content-' + guidFor(this);

  get classNames() {
    const classes = ['doc-table-of-contents__button'];
    if (this.isOpen) {
      classes.push('doc-table-of-contents__button--open');
    }
    return classes.join(' ');
  }

  <template>
    <div class="doc-table-of-contents__folder">
      <button
        type="button"
        aria-controls={{if this.isOpen this.contentId: ""}}
        aria-expanded={{if this.isOpen "true" "false"}}
        class={{this.classNames}}
        {{on "click" this.toggleIsOpen}}
      >
        {{@name}}
      </button>
      {{#if this.isOpen}}
        <DocTableOfContents
          @structuredPageTree={{@item.children}}
          @depth={{@depth}}
          id={{this.contentId}}
        />
      {{/if}}
    </div>
  </template>
}
