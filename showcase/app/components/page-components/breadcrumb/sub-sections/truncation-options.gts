import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import CodeFragmentWithLongStrings from '../code-fragments/with-long-strings';

import { HdsBreadcrumb, HdsBreadcrumbItem, HdsBreadcrumbTruncation } from '@hashicorp/design-system-components/components';

const SubSectionTruncationOptions: TemplateOnlyComponent = <template>

  <ShwTextH2>Truncation options</ShwTextH2>

  <ShwFlex @label="With long strings / items can wrap (default)" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <CodeFragmentWithLongStrings />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With long strings / items can't wrap (text is elliptized)" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <CodeFragmentWithLongStrings @itemsCanWrap={{false}} />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With max-width on single item" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-with-max-width">
      <HdsBreadcrumb @itemsCanWrap={{false}} aria-label="breadcrumb with max-widh set example">
        <HdsBreadcrumbItem @text="Level one" @icon="org" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" />
        <HdsBreadcrumbItem @text="Level three" />
        <HdsBreadcrumbItem @text="Level four with a very long string" @maxWidth="180px" />
        <HdsBreadcrumbItem @text="Level five" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With 'truncation' element" as |SF|>
    <SF.Item class="shw-component-breadcrumb-sample-truncation-dropdown">
      <HdsBreadcrumb aria-label="breadcrumb with truncation element example">
        <HdsBreadcrumbItem @text="Level one" />
        <HdsBreadcrumbItem @text="Level two" />
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Level four with a long string that can span multiple lines" />
          <HdsBreadcrumbItem @text="Level five with icon" @icon="dashboard" />
          <HdsBreadcrumbItem @text="Level six with icon" @icon="database" />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @text="Level seven" />
        <HdsBreadcrumbItem @text="Level eight" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionTruncationOptions;
