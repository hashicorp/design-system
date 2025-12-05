/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsTable } from '@hashicorp/design-system-components/components';

import CodeFragmentWithMusicData from 'showcase/components/page-components/table/code-fragments/with-music-data';

const SubSectionDataModel: TemplateOnlyComponent = <template>
  <ShwTextH2>Data model</ShwTextH2>

  <ShwTextH4 @tag="h3">Table with model</ShwTextH4>

  <CodeFragmentWithMusicData
    @columns={{array
      (hash key="artist" label="Artist")
      (hash key="album" label="Album")
      (hash key="year" label="Release Year")
    }}
  />

  <ShwTextH4 @tag="h3">Table with no model defined</ShwTextH4>

  <HdsTable @caption="a custom table with no model defined">
    <:head as |H|>
      <H.Tr>
        <H.Th>Cell Header</H.Th>
        <H.Th>Cell Header</H.Th>
        <H.Th @width="20%">Custom Width</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Th>Scope Row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwDivider />
</template>;

export default SubSectionDataModel;
