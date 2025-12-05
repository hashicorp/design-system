/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash, concat } from '@ember/helper';
import { LinkTo } from '@ember/routing';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import DocMetaRow from 'website/components/doc/meta-row';

interface DocIconsListItemSignature {
  Args: {
    meta: {
      iconName: HdsIconSignature['Args']['name'];
      name: string;
      description: string;
      size: HdsIconSignature['Args']['size'];
      isHidden?: boolean;
    };
  };
}

const DocIconsListItem: TemplateOnlyComponent<DocIconsListItemSignature> =
  <template>
    <li
      class="doc-icons-list-grid-item
        {{if @meta.isHidden 'doc-icons-list-grid-item--is-hidden'}}"
    >
      <div class="doc-icons-list-grid-item__frame">
        <div class="doc-icons-list-grid-item__outline">
          <HdsIcon
            class="doc-icons-list-grid-item__icon"
            @name={{@meta.iconName}}
            @size={{@meta.size}}
          />
        </div>
      </div>
      <div class="doc-icons-list-grid-item__meta">
        <DocMetaRow
          @label="Ember"
          @valueToCopy={{@meta.iconName}}
          @copyable={{true}}
        />
        <DocMetaRow
          @label="React"
          @valueToCopy={{@meta.name}}
          @copyable={{true}}
        />
        <DocMetaRow @label="Keywords" @valueToShow={{@meta.description}} />
        {{#let (concat "icon:" @meta.iconName) as |searchQueryValue|}}
          <LinkTo
            class="doc-icons-list-grid-item__permalink"
            @route="show"
            @model="icons/library"
            @query={{hash
              searchQuery=searchQueryValue
              selectedIconSize=@meta.size
            }}
            aria-label="Permalink for the {{@meta.iconName}} icon"
            data-test="icon-permalink-{{@meta.iconName}}"
          >
            <HdsIcon
              class="doc-icons-list-grid-item__permalink-icon"
              @name="link"
            />
          </LinkTo>
        {{/let}}
      </div>
    </li>
  </template>;

export default DocIconsListItem;
