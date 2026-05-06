/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsButton } from '@hashicorp/design-system-components/components';

import CodeFragmentWithTrigger from '../code-fragments/with-trigger';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true the modal renders the Carbon
    <code>cds-modal</code>
    implementation. When false (default), the original HDS implementation —
    which uses the native
    <code>&lt;dialog&gt;</code>
    element with focus-trap — is rendered. The yielded
    <code>Header</code>
    /
    <code>Body</code>
    /
    <code>Footer</code>
    block API is the same in both cases.</p>

  <ShwTextH3>HDS modal (default)</ShwTextH3>

  <CodeFragmentWithTrigger @triggerText="Open HDS modal" id="use-cds-hds-modal">
    <:modal as |M|>
      <M.Header>
        HDS modal title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">
          This modal is rendered with the original HDS implementation (native
          <code>&lt;dialog&gt;</code>
          + focus-trap).
        </p>
      </M.Body>
      <M.Footer as |F|>
        <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
      </M.Footer>
    </:modal>
  </CodeFragmentWithTrigger>

  <ShwTextH3>Carbon modal (useCds=true)</ShwTextH3>

  <CodeFragmentWithTrigger
    @triggerText="Open Carbon modal"
    id="use-cds-cds-modal"
    @useCds={{true}}
  >
    <:modal as |M|>
      <M.Header>
        Carbon modal title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">
          This modal is rendered with the Carbon
          <code>cds-modal</code>
          implementation.
        </p>
      </M.Body>
      <M.Footer>
        <cds-modal-footer-button kind="primary" data-modal-close>
          Confirm
        </cds-modal-footer-button>
      </M.Footer>
    </:modal>
  </CodeFragmentWithTrigger>

  <ShwTextH3>Carbon modal (useCds=true) — small size</ShwTextH3>

  <CodeFragmentWithTrigger
    @triggerText="Open small Carbon modal"
    id="use-cds-cds-modal-small"
    @useCds={{true}}
    @size="small"
  >
    <:modal as |M|>
      <M.Header>
        Small Carbon modal
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">
          The
          <code>@size</code>
          arg is forwarded to the Carbon implementation.
        </p>
      </M.Body>
      <M.Footer>
        <cds-modal-footer-button kind="primary" data-modal-close>
          Confirm
        </cds-modal-footer-button>
      </M.Footer>
    </:modal>
  </CodeFragmentWithTrigger>
</template>;

export default SubSectionUseCds;
