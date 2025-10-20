/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsFlyout,
  HdsButton,
  HdsButtonSet,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>Header</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Title with icon" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-icon" as |F|>
        <F.Header @icon="info">
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
      </HdsFlyout>
    </SF.Item>
    <SF.Item
      @label="Title with tagline"
      class="shw-component-flyout-sample-item"
    >
      <HdsFlyout open id="flyout-example-tagline" as |F|>
        <F.Header @tagline="Tagline">
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
      </HdsFlyout>
    </SF.Item>
    <SF.Item
      @label="Title with tagline and icon"
      class="shw-component-flyout-sample-item"
    >
      <HdsFlyout open id="flyout-example-tagline-icon" as |F|>
        <F.Header @tagline="Tagline" @icon="info">
          A very, very long title that spans multiple lines to test this element
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
      </HdsFlyout>
    </SF.Item>
    <SF.Item
      @label="Title with description"
      class="shw-component-flyout-sample-item"
    >
      <HdsFlyout open id="flyout-example-description" as |F|>
        <F.Header>
          Title
        </F.Header>
        <F.Description>
          This is a very long
          <strong>description</strong>
          to test appropriate text
          <HdsLinkInline @href="#">wrapping</HdsLinkInline>
          and formatting on this element
        </F.Description>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
      </HdsFlyout>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3 @tag="h2">Body</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With basic style" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-basic-style" as |F|>
        <F.Header @tagline="Tagline" @icon="info">
          Title
        </F.Header>
        <F.Description>
          Description
        </F.Description>
        <F.Body tabindex="0">
          <p class="hds-typography-body-300 hds-foreground-primary">HashiCorp
            uses data collected by cookies and JavaScript libraries to improve
            your browsing experience, analyze site traffic, and increase the
            overall performance of our site. By using our website, you're
            agreeing to our Privacy Policy and Cookie Policy.</p>
          <br />
          <p class="hds-typography-body-300 hds-foreground-primary">The
            categories below outline which companies and tools we use for
            collecting data. To opt out of a category of data collection, set
            the toggle to "Off" and save your preferences.</p>
        </F.Body>
      </HdsFlyout>
    </SF.Item>
    <SF.Item
      @label="With generic content"
      class="shw-component-flyout-sample-item"
    >
      <HdsFlyout open id="flyout-example-generic-content" as |F|>
        <F.Header @icon="info">
          Title
        </F.Header>
        <F.Body>
          <ShwPlaceholder @text="some generic content" @height="50" />
        </F.Body>
      </HdsFlyout>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3 @tag="h2">Footer</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="One action" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-one-action" as |F|>
        <F.Header>
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
        <F.Footer>
          <HdsButton type="submit" @text="Primary" />
        </F.Footer>
      </HdsFlyout>
    </SF.Item>
    <SF.Item @label="Two actions" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-two-actions" as |F|>
        <F.Header>
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
        <F.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Primary" />
            <HdsButton type="button" @text="Secondary" @color="secondary" />
          </HdsButtonSet>
        </F.Footer>
      </HdsFlyout>
    </SF.Item>
    <SF.Item @label="Three actions" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-three-action" as |F|>
        <F.Header>
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
        <F.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Primary" />
            <HdsButton type="button" @text="Secondary" @color="secondary" />
            <HdsButton
              type="button"
              @text="Tertiary"
              @color="tertiary"
              @icon="arrow-right"
              @iconPosition="trailing"
            />
          </HdsButtonSet>
        </F.Footer>
      </HdsFlyout>
    </SF.Item>
    <SF.Item
      @label="Generic footer content"
      class="shw-component-flyout-sample-item"
    >
      <HdsFlyout open id="flyout-example-footer-generic" as |F|>
        <F.Header>
          Title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Flyout content
          </p>
        </F.Body>
        <F.Footer>
          <ShwPlaceholder @text="some generic content" @height="50" />
        </F.Footer>
      </HdsFlyout>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
