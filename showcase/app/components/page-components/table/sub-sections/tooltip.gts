/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';

import { HdsTable } from '@hashicorp/design-system-components/components';

import CodeFragmentWithMusicData from 'showcase/components/page-components/table/code-fragments/with-music-data';

const SubSectionTooltip: TemplateOnlyComponent = <template>
  <ShwTextH2>Tooltip</ShwTextH2>

  <ShwTextH4 @tag="h3">Table with model (sortable and non-sortable columns)</ShwTextH4>

  <CodeFragmentWithMusicData
    @columns={{array
      (hash
        key="artist"
        label="Artist"
        isSortable=true
        tooltip="Artist performing the album"
      )
      (hash key="album" label="Album" tooltip="Name of the album")
      (hash
        key="vinyl-cost"
        label="Vinyl Cost (USD)"
        isSortable=true
        tooltip="Cost of the vinyl"
        align="right"
      )
      (hash
        key="year"
        label="Release Year"
        tooltip="Year of release of the album"
        align="right"
      )
    }}
    @showVinylCost={{true}}
    @rightAlignYear={{true}}
  />

  <ShwTextH4 @tag="h3">Table without model defined (sortable and non-sortable
    columns)</ShwTextH4>

  <ShwTextBody>⚠️
    <em>Notice: in this example the "sort" button doesn't work, is for
      presentation purpose only.</em></ShwTextBody>

  <HdsTable @caption="a custom table with no model defined">
    <:head as |H|>
      <H.Tr>
        <H.ThSort @tooltip="Column #1 extra information">Cell Header</H.ThSort>
        <H.Th @tooltip="Column #2 extra information">Cell Header</H.Th>
        <H.Th>Cell Header</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Th
          @tooltip="This is an extra (non documented) case, made possible by the fact that the &lt;TableTh&gt; subcomponent is yielded in both the &lt;thead&gt; and the &lt;tbody&gt;"
        >Scope Row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Th>Scope row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Th>Scope row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwDivider />
</template>;

export default SubSectionTooltip;
