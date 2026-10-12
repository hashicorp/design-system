/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { hash, concat } from '@ember/helper';
import { LinkTo } from '@ember/routing';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import { IconRegistry } from '@hashicorp/flight-icons/symbol-js/registry';
import {
  HdsIconLibraryValues,
  HdsIconSizeValues,
} from '@hashicorp/design-system-components/components/hds/icon/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';
import type HdsIconRegistryService from '@hashicorp/design-system-components/services/hds-icon-registry';

import DocMetaRow from 'website/components/doc/meta-row';

interface DocIconsListItemSignature {
  Args: {
    meta: {
      iconName: HdsIconSignature['Args']['name'];
      name: string;
      description: string;
      mapping?: string;
      size: HdsIconSignature['Args']['size'];
      isHidden?: boolean;
    };
  };
}

export default class DocIconsListItem extends Component<DocIconsListItemSignature> {
  @service declare readonly hdsIconRegistry: HdsIconRegistryService;

  get carbonMapping(): string | undefined {
    return this.args.meta?.mapping;
  }

  get carbonSymbolId(): string | null {
    if (IconRegistry[this.args.meta.iconName]?.carbon === null) {
      return null;
    }

    this.hdsIconRegistry.requestLoad({
      name: this.args.meta.iconName,
      size: this.args.meta.size ?? HdsIconSizeValues.Sixteen,
      library: HdsIconLibraryValues.Carbon,
    });

    return this.hdsIconRegistry.getSymbolId({
      name: this.args.meta.iconName,
      size: this.args.meta.size ?? HdsIconSizeValues.Sixteen,
      library: HdsIconLibraryValues.Carbon,
    });
  }

  <template>
    <li
      class="doc-icons-list-grid-item
        {{if @meta.isHidden 'doc-icons-list-grid-item--is-hidden'}}"
    >
      <div class="doc-icons-list-grid-item__frame">
        <span class="doc-icons-list-grid-item__icon-label">HDS</span>
        <div class="doc-icons-list-grid-item__outline">
          <HdsIcon
            class="doc-icons-list-grid-item__icon"
            @name={{@meta.iconName}}
            @size={{@meta.size}}
          />
        </div>
        <span class="doc-icons-list-grid-item__icon-label">Carbon</span>
        {{#if this.carbonSymbolId}}
          <div class="doc-icons-list-grid-item__outline">
            <svg
              class="doc-icons-list-grid-item__icon doc-icons-list-grid-item__icon--carbon"
              width={{@meta.size}}
              height={{@meta.size}}
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              data-test-icon-carbon={{@meta.iconName}}
            >
              <use href="#{{this.carbonSymbolId}}"></use>
            </svg>
          </div>
        {{else}}
          <div class="doc-icons-list-grid-item__icon-no-mapping">–</div>
        {{/if}}
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
        {{#if this.carbonMapping}}
          <DocMetaRow @label="Carbon" @valueToShow={{this.carbonMapping}} />
        {{/if}}
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
  </template>
}
