/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import type { FolkMusic } from 'showcase/mocks/folk-music-data';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

export const DEFAULT_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

export interface CodeFragmentWithEmptyStateSignature {
  Args: {
    emptyState?: 'named-block' | 'application-state';
  };
  Element: HTMLDivElement;
}

const EMPTY_MODEL: FolkMusic[] = [];

const CodeFragmentWithEmptyState: TemplateOnlyComponent<CodeFragmentWithEmptyStateSignature> =
  <template>
    {{#if (eq @emptyState "named-block")}}
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
    {{else if (eq @emptyState "application-state")}}
      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{EMPTY_MODEL}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
      >
        <:emptyState as |E|>
          <E.ApplicationState as |A|>
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
          </E.ApplicationState>
        </:emptyState>
      </HdsAdvancedTable>
    {{else}}
      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{EMPTY_MODEL}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
      />
    {{/if}}
  </template>;

export default CodeFragmentWithEmptyState;
