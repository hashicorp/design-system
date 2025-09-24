/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';

import SubSectionListItemsCheckbox from 'showcase/components/page-components/dropdown/sub-sections/list-items/checkbox';
import SubSectionListItemsCheckmark from 'showcase/components/page-components/dropdown/sub-sections/list-items/checkmark';
import SubSectionListItemsCopyItem from 'showcase/components/page-components/dropdown/sub-sections/list-items/copy-item';
import SubSectionListItemsGeneric from 'showcase/components/page-components/dropdown/sub-sections/list-items/generic';
import SubSectionListItemsInteractive from 'showcase/components/page-components/dropdown/sub-sections/list-items/interactive';
import SubSectionListItemsNotInteractive from 'showcase/components/page-components/dropdown/sub-sections/list-items/not-interactive';
import SubSectionListItemsRadio from 'showcase/components/page-components/dropdown/sub-sections/list-items/radio';

const SubSectionListItems: TemplateOnlyComponent = <template>
  <ShwTextH2>List Items</ShwTextH2>

  <SubSectionListItemsNotInteractive />
  <SubSectionListItemsInteractive />
  <SubSectionListItemsGeneric />
  <SubSectionListItemsCopyItem />
  <SubSectionListItemsCheckmark />
  <SubSectionListItemsCheckbox />
  <SubSectionListItemsRadio />
</template>;

export default SubSectionListItems;
