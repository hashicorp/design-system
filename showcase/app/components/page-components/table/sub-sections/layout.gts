/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';

import CodeFragmentWithUsersData from 'showcase/components/page-components/table/code-fragments/with-users-data';

import { HdsTable } from '@hashicorp/design-system-components/components';

const SubSectionLayout: TemplateOnlyComponent = <template>
  <ShwTextH2>Layout</ShwTextH2>

  <ShwTextH3>Interaction between table layout and columns width</ShwTextH3>

  <ShwTextH4>Width in <code>px</code> + Table-layout = 'auto'</ShwTextH4>

  <CodeFragmentWithUsersData
    @dataSize="medium"
    @columns={{array
      (hash key="first_name" label="First Name" isSortable=true width="200px")
      (hash key="last_name" label="Last Name" isSortable=true width="200px")
      (hash key="age" label="Age" isSortable=true align="right")
      (hash key="email" label="Email")
      (hash key="bio" label="Biography" width="350px")
    }}
  />

  <ShwTextH4>Width in <code>px</code> + Table-layout = 'fixed'</ShwTextH4>

  <ShwTextBody>⚠️
    <em>Notice: this example looks broken but we’ve left it on purpose to show
      what happens when a fixed layout is applied to the table, with only some
      columns having a width declared.</em></ShwTextBody>

  <CodeFragmentWithUsersData
    @dataSize="medium"
    @columns={{array
      (hash key="first_name" label="First Name" isSortable=true width="200px")
      (hash key="last_name" label="Last Name" isSortable=true width="200px")
      (hash key="age" label="Age" isSortable=true align="right")
      (hash key="email" label="Email")
      (hash key="bio" label="Biography" width="350px")
    }}
    @isFixedLayout={{true}}
  />

  <ShwTextH4>Width in <code>%</code> + Table-layout = 'auto'</ShwTextH4>

  <CodeFragmentWithUsersData
    @dataSize="medium"
    @columns={{array
      (hash key="first_name" label="First Name" isSortable=true width="20%")
      (hash key="last_name" label="Last Name" isSortable=true width="20%")
      (hash key="age" label="Age" isSortable=true align="right")
      (hash key="email" label="Email")
      (hash key="bio" label="Biography" width="35%")
    }}
  />

  <ShwTextH4>Width in <code>%</code> + Table-layout = 'fixed'</ShwTextH4>

  <CodeFragmentWithUsersData
    @dataSize="medium"
    @columns={{array
      (hash key="first_name" label="First Name" isSortable=true width="20%")
      (hash key="last_name" label="Last Name" isSortable=true width="20%")
      (hash key="age" label="Age" isSortable=true align="right")
      (hash key="email" label="Email")
      (hash key="bio" label="Biography" width="35%")
    }}
    @isFixedLayout={{true}}
  />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Large table with overflowing container</ShwTextH3>

  <ShwTextH4>Container with overflow = 'auto' + Table-layout = 'auto' + Columns
    width (in
    <code>px</code>)</ShwTextH4>

  <div class="shw-component-table-scrollable-wrapper">
    <CodeFragmentWithUsersData
      @dataSize="large"
      @columns={{array
        (hash key="first_name" label="First Name" isSortable=true width="200px")
        (hash key="last_name" label="Last Name" isSortable=true width="200px")
        (hash key="age" label="Age" isSortable=true align="right")
        (hash key="email" label="Email" isSortable=true)
        (hash key="phone" label="Phone" isSortable=true)
        (hash key="bio" label="Biography" width="350px")
        (hash key="education" label="Education Degree" isSortable=true)
        (hash key="occupation" label="Occupation" isSortable=true)
      }}
    />
  </div>

  <ShwTextH4>Container with overflow = 'auto' + Sub-container with 'max-content'
    width + Table-layout = 'auto' + Columns width (in
    <code>px</code>)</ShwTextH4>

  <div class="shw-component-table-scrollable-wrapper">
    <div class="shw-component-table-max-content-width">
      <CodeFragmentWithUsersData
        @dataSize="large"
        @columns={{array
          (hash
            key="first_name" label="First Name" isSortable=true width="200px"
          )
          (hash key="last_name" label="Last Name" isSortable=true width="200px")
          (hash key="age" label="Age" isSortable=true align="right")
          (hash key="email" label="Email" isSortable=true)
          (hash key="phone" label="Phone" isSortable=true)
          (hash key="bio" label="Biography" width="350px")
          (hash key="education" label="Education Degree" isSortable=true)
          (hash key="occupation" label="Occupation" isSortable=true)
        }}
      />
    </div>
  </div>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Table with <code>colspan/rowspan</code> attributes</ShwTextH3>

  <HdsTable>
    <:head as |H|>
      <H.Tr>
        <H.Th>Lorem</H.Th>
        <H.Th>Ipsum</H.Th>
        <H.Th>Dolor</H.Th>
        <H.Th>Sit amet</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Th rowspan="3">Scope Row with rowspan="3"</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td colspan="2">Cell Content with colspan="2"</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td colspan="3">Cell Content with colspan="3"</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Th rowspan="2">Scope Row with rowspan="2"</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td rowspan="3">Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Th>Scope Row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Th>Scope Row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwDivider />
</template>;

export default SubSectionLayout;
