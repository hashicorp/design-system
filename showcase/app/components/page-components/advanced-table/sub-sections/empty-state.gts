/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import type { FolkMusic } from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsApplicationState,
} from '@hashicorp/design-system-components/components';

const DEFAULT_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const EMPTY_MODEL: FolkMusic[] = [];

const SubSectionEmptyState: TemplateOnlyComponent = <template>
  <ShwTextH2>Empty state</ShwTextH2>

  <ShwTextH4 @tag="h3">Default</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{EMPTY_MODEL}}
    @columns={{DEFAULT_COLUMNS}}
    @maxHeight="400px"
  />

  <ShwTextH4 @tag="h3">With
    <code>:emptyState</code>
    block</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{EMPTY_MODEL}}
    @columns={{DEFAULT_COLUMNS}}
    @maxHeight="400px"
  >
    <:emptyState>
      <ShwPlaceholder
        @text="Custom empty state content"
        @width="300"
        @height="50"
      />
    </:emptyState>
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">With
    <code>:emptyState</code>
    block +
    <code>ApplicationState</code>
  </ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{EMPTY_MODEL}}
    @columns={{DEFAULT_COLUMNS}}
    @maxHeight="400px"
  >
    <:emptyState>
      <HdsApplicationState as |A|>
        <A.Header
          @title="An error has occurred"
          @icon="help"
          @errorCode="404"
        />
        <A.Body
          @text="Sorry, an unexpected error has occurred.
          Please try again later or contact support for assistance."
        />
        <A.Footer as |F|>
          <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          <F.LinkStandalone
            @icon="help"
            @text="Need Help"
            @href="/components/alert"
            @iconPosition="trailing"
          />
        </A.Footer>
      </HdsApplicationState>
    </:emptyState>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionEmptyState;
