/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import CodeFragmentWithLongStrings from '../code-fragments/with-long-strings';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

const SubSectionTruncationOptions: TemplateOnlyComponent = <template>
  <ShwTextH2>Truncation options</ShwTextH2>

  <ShwFlex @label="With long strings / items can wrap (default)" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <CodeFragmentWithLongStrings />
    </SF.Item>
  </ShwFlex>

  <ShwFlex
    @label="With long strings / items can't wrap (text is elliptized)"
    as |SF|
  >
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <CodeFragmentWithLongStrings @itemsCanWrap={{false}} />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With max-width on single item" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <HdsBreadcrumb
        @itemsCanWrap={{false}}
        aria-label="breadcrumb with max-widh set example"
      >
        <HdsBreadcrumbItem @route="catch-all" @text="Level one" @icon="org" />
        <HdsBreadcrumbItem
          @route="catch-all"
          @text="Level two"
          @icon="folder"
        />
        <HdsBreadcrumbItem @route="catch-all" @text="Level three" />
        <HdsBreadcrumbItem
          @route="catch-all"
          @text="Level four with a very long string"
          @maxWidth="180px"
        />
        <HdsBreadcrumbItem @route="catch-all" @text="Level five" />
        <HdsBreadcrumbItem
          @route="catch-all"
          @text="Current"
          @current={{true}}
        />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With 'truncation' element" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-truncation-dropdown">
      <HdsBreadcrumb aria-label="breadcrumb with truncation element example">
        <HdsBreadcrumbItem @route="catch-all" @text="Level one" />
        <HdsBreadcrumbItem @route="catch-all" @text="Level two" />
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @route="catch-all" @text="Level three" />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Level four with a long string that can span multiple lines"
          />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Level five with icon"
            @icon="dashboard"
          />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Level six with icon"
            @icon="database"
          />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @route="catch-all" @text="Level seven" />
        <HdsBreadcrumbItem @route="catch-all" @text="Level eight" />
        <HdsBreadcrumbItem
          @route="catch-all"
          @text="Current"
          @current={{true}}
        />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionTruncationOptions;
