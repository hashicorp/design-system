/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';

import {
  HdsTable,
  HdsCopySnippet,
} from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item @forceMinWidth={{true}} as |SGI|>
          <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
          <div {{style display=display overflow="hidden"}}>
            <HdsCopySnippet @textToCopy="With short text" />
          </div>
          <div {{style display=display overflow="hidden"}}>
            <HdsCopySnippet
              @textToCopy="With some really long text that should wrap and be multi-line"
            />
          </div>
          <div {{style display=display overflow="hidden"}}>
            <HdsCopySnippet
              @textToCopy="With some really long text that should be truncated"
              @isTruncated={{true}}
            />
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwFlex @label="Within a table" as |SF|>
    <SF.Item @grow={{true}}>
      <HdsTable
        @isStriped={{true}}
        @isFixedLayout={{true}}
        @caption="Static table used to demo different use cases of the Copy::Snippet component"
      >
        <:head as |H|>
          <H.Tr>
            <H.Th>Use case</H.Th>
            <H.Th>Cluster partition</H.Th>
            <H.Th>Imported services</H.Th>
            <H.Th>Exported services</H.Th>
            <H.Th {{style width="250px"}}>Secret key</H.Th>
          </H.Tr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Th>With short text</B.Th>
            <B.Td>cluster-2 / partition-2</B.Td>
            <B.Td>10</B.Td>
            <B.Td>10</B.Td>
            <B.Td><HdsCopySnippet
                @textToCopy="With short text"
                @color="secondary"
              /></B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>With short text + Full width</B.Th>
            <B.Td>cluster-3 / partition-3</B.Td>
            <B.Td>10</B.Td>
            <B.Td>10</B.Td>
            <B.Td><HdsCopySnippet
                @textToCopy="With short text"
                @color="secondary"
                @isFullWidth={{true}}
              /></B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>With long text (wrapping)</B.Th>
            <B.Td>cluster-3 / partition-3</B.Td>
            <B.Td>10</B.Td>
            <B.Td>10</B.Td>
            <B.Td><HdsCopySnippet
                @textToCopy="With some really long text that should wrap and be multi-line"
                @color="secondary"
              /></B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>With long text + Truncation</B.Th>
            <B.Td>cluster-3 / partition-3</B.Td>
            <B.Td>10</B.Td>
            <B.Td>10</B.Td>
            <B.Td><HdsCopySnippet
                @textToCopy="With some really long text that should be truncated"
                @color="secondary"
                @isTruncated={{true}}
              /></B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContainers;
