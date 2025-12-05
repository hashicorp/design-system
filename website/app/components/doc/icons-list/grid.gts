/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import DocIconsListItem from 'website/components/doc/icons-list/item';

export interface CategoryIcon {
  iconName: HdsIconSignature['Args']['name'];
  name: string;
  description: string;
  size: HdsIconSignature['Args']['size'];
  isHidden?: boolean;
}

interface DocIconsListGridSignature {
  Args: {
    categoryName?: string;
    categoryIcons: CategoryIcon[];
  };
}

const DocIconsListGrid: TemplateOnlyComponent<DocIconsListGridSignature> =
  <template>
    {{#if @categoryName}}
      <h2 class="doc-text-h4">{{capitalize @categoryName}}</h2>
    {{/if}}
    <ul class="doc-icons-list-grid" role="list">
      {{#each @categoryIcons as |meta|}}
        <DocIconsListItem @meta={{meta}} />
      {{/each}}
    </ul>
  </template>;

export default DocIconsListGrid;
