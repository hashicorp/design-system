/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionContentSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionContent: TemplateOnlyComponent<SubSectionContentSignature> =
  <template>
    <ShwTextH2>Content</ShwTextH2>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="Without actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, we couldn't find any results matching your search criteria. Please try again with different search terms or refine your filters."
          />
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With link action">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title text" />
          <A.Body
            @text="Sorry, we couldn't find any results matching your search criteria. Please try again with different search terms or refine your filters."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="With generic body content">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title text" />
          <A.Body>
            <ShwPlaceholder
              @text="generic content"
              @width="320px"
              @height="120px"
            />
          </A.Body>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With generic content + Footer with action">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title text" />
          <A.Body>
            <ShwPlaceholder
              @text="generic content"
              @width="320px"
              @height="120px"
            />
          </A.Body>
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="With icon in header">
        <HdsApplicationState as |A|>
          <A.Header @title="An error has occurred" @icon="help" />
          <A.Body
            @text="Sorry, we couldn't find any results matching your search criteria. Please try again with different search terms or refine your filters."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With error code in header">
        <HdsApplicationState as |A|>
          <A.Header @title="An error has occurred" @errorCode="404" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With icon and error code">
        <HdsApplicationState as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With a multiline title">
        <HdsApplicationState as |A|>
          <A.Header
            @title="An error has occurred and maybe it has such a long title that will wrap on multiple lines"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="With custom title tag">
        <HdsApplicationState as |A|>
          <A.Header
            @title="h1 element instead of the default div"
            @titleTag="h1"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="Two links as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.LinkStandalone
              @icon="arrow-left"
              @text="Go to previous page"
              @href="/"
            />
            <F.LinkStandalone
              @icon="help"
              @text="Need Help"
              @href="/components/alert"
              @iconPosition="trailing"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="Two buttons as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.Button @color="secondary" @text="Secondary action" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="One button + One link as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Body
            @text="Sorry, we couldn't find any results matching your search criteria. Please try again with different search terms or refine your filters."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="Two buttons + one link as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.Button @color="secondary" @text="Secondary action" />
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="Dropdown as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Dropdown @listPosition="bottom-right" as |dd|>
              <dd.ToggleButton @text="Choose an option" />
              <dd.Title @text="Categories" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Changelogs</dd.Interactive>
            </F.Dropdown>
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="Dropdown + button as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Dropdown @listPosition="bottom-right" as |dd|>
              <dd.ToggleButton @text="Choose an option" />
              <dd.Title @text="Categories" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Changelogs</dd.Interactive>
            </F.Dropdown>
            <F.Button @color="secondary" @text="Secondary action" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
      <SF.Item @label="Dropdown + button + link as actions">
        <HdsApplicationState as |A|>
          <A.Header @title="Empty state title" />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer @hasDivider={{true}} as |F|>
            <F.Dropdown @listPosition="bottom-right" as |dd|>
              <dd.ToggleButton @text="Choose an option" />
              <dd.Title @text="Categories" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Changelogs</dd.Interactive>
            </F.Dropdown>
            <F.Button @color="secondary" @text="Secondary action" />
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionContent;
