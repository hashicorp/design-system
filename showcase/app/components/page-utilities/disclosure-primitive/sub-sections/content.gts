/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import CodeFragmentWithGenericContent from 'showcase/components/page-utilities/disclosure-primitive/code-fragments/with-generic-content';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwFlex as |SF|>
    <SF.Label>With generic HTML
      <code>&lt;button&gt;</code>
      and generic content (placeholder)</SF.Label>
    <SF.Item @grow={{true}}>
      <CodeFragmentWithGenericContent>
        <ShwPlaceholder
          @text="some generic content here"
          @width="200"
          @height="90"
          @background="#e1f5fe"
        />
      </CodeFragmentWithGenericContent>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label>With generic HTML
      <code>&lt;button&gt;</code>
      and generic list of
      <code>&lt;a&gt;</code>
      links</SF.Label>
    <SF.Item @grow={{true}}>
      <CodeFragmentWithGenericContent as |CF|>
        <ul class="shw-utility-disclosure-primitive-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" CF.close}}>Button that closes the
              disclosed content on click</button>
          </li>
        </ul>
      </CodeFragmentWithGenericContent>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label>With generic HTML
      <code>&lt;button&gt;</code>
      and generic
      <code>&lt;input type="date"&gt;</code>
    </SF.Label>
    <SF.Item @grow={{true}}>
      <CodeFragmentWithGenericContent>
        <ul class="shw-utility-disclosure-primitive-content-list-of-links">
          <li>
            <label for="date-input">Select date</label>
            <input id="date-input" type="date" />
          </li>
        </ul>
      </CodeFragmentWithGenericContent>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label>With
      <code>&lt;HdsButton&gt;</code>
      and generic list of
      <code>&lt;a&gt;</code>
      links</SF.Label>
    <SF.Item @grow={{true}}>
      <CodeFragmentWithGenericContent @toggleType="hds-button" as |CF|>
        <ul class="shw-utility-disclosure-primitive-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" CF.close}}>Button that closes the
              disclosed content on click</button>
          </li>
        </ul>
      </CodeFragmentWithGenericContent>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Label>With
      <code>&lt;HdsButton&gt;</code>
      inside a larger container and generic list of
      <code>&lt;a&gt;</code>
      links</SF.Label>
    <SF.Item @grow={{true}}>
      <CodeFragmentWithGenericContent
        @toggleType="hds-button"
        @wrapperContainer={{true}}
        as |CF|
      >
        <ul class="shw-utility-disclosure-primitive-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" CF.close}}>Button that closes the
              disclosed content on click</button>
          </li>
        </ul>
      </CodeFragmentWithGenericContent>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
