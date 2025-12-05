/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';

import {
  HdsPageHeader,
  HdsBadge,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const SubSectionWrapping: TemplateOnlyComponent = <template>
  <ShwTextH2>Component wrapping</ShwTextH2>

  <ShwTextBody @tag="p">The component uses container queries to determine two
    breakpoints at
    <code>768px</code>
    and
    <code>400px</code>
    which stack the content in a single column.
  </ShwTextBody>

  <ShwFlex @direction="column" @gap="2.5rem" as |SF|>
    {{#let (array "399px" "767px" "100%") as |widths|}}
      {{#each widths as |width|}}
        <SF.Item @label="Container width = {{width}}">
          <ShwOutliner {{style width=width}}>
            <HdsPageHeader as |PH|>
              <PH.Title>Title of the page</PH.Title>
              <PH.IconTile @icon="smartphone" />
              <PH.Breadcrumb>
                <HdsBreadcrumb aria-label="example for {{width}}">
                  <HdsBreadcrumbItem @text="Organization" />
                  <HdsBreadcrumbItem @text="User" />
                </HdsBreadcrumb>
              </PH.Breadcrumb>
              <PH.Badges>
                <HdsBadge @text="Small viewport" @icon="tablet" />
              </PH.Badges>
              <PH.Subtitle>Forced small viewport</PH.Subtitle>
              <PH.Actions>
                <HdsButton @text="Edit" @color="secondary" />
                <HdsButton @text="Create" @color="primary" />
              </PH.Actions>
            </HdsPageHeader>
          </ShwOutliner>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>
</template>;
export default SubSectionWrapping;
