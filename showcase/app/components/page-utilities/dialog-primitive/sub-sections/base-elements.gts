/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsButton,
  HdsButtonSet,
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveDescription,
  HdsDialogPrimitiveFooter,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveOverlay,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <div class="shw-utility-dialog-primitive-base-elements-section">
    <ShwTextH2>DialogPrimitiveHeader</ShwTextH2>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="title only">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader>
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="with icon">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @icon="info">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="with tagline">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @tagline="Tagline">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="with tagline and icon">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @icon="info" @tagline="Tagline">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="with very long content">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader
            @icon="info"
            @tagline="Tagline with very, very long content that spans multiple lines to test this element, very, very long content that spans multiple lines to test this element, very, very long content that spans multiple lines to test this element"
          >
            Title with very, very long content that spans multiple lines to test
            this element, very, very long content that spans multiple lines to
            test this element
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="as H1">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @tagline="Tagline" @titleTag="h1">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
      <SF.Item @label="as H2">
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @tagline="Tagline" @titleTag="h2">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveDescription</ShwTextH2>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item>
        <HdsDialogPrimitiveDescription>
          This is a very long
          <strong>description</strong>
          to test appropriate text
          <HdsLinkInline @href="#">wrapping</HdsLinkInline>
          and formatting on this element. This is a very long
          <strong>description</strong>
          to test appropriate text
          <HdsLinkInline @href="#">wrapping</HdsLinkInline>
          and formatting on this element.
        </HdsDialogPrimitiveDescription>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveBody</ShwTextH2>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="With basic style">
        <HdsDialogPrimitiveBody>
          <p class="hds-typography-body-300 hds-foreground-primary">HashiCorp
            uses data collected by cookies and JavaScript libraries to improve
            your browsing experience, analyze site traffic, and increase the
            overall performance of our site. By using our website, you’re
            agreeing to our Privacy Policy and Cookie Policy.</p>
          <br />
          <p class="hds-typography-body-300 hds-foreground-primary">The
            categories below outline which companies and tools we use for
            collecting data. To opt out of a category of data collection, set
            the toggle to “Off” and save your preferences.</p>
        </HdsDialogPrimitiveBody>
      </SF.Item>
      <SF.Item @label="With generic content">
        <HdsDialogPrimitiveBody>
          <ShwPlaceholder
            @text="some generic content"
            @height="50"
            tabindex="0"
          />
        </HdsDialogPrimitiveBody>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveFooter</ShwTextH2>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="One action">
        <HdsDialogPrimitiveFooter>
          <HdsButton type="submit" @text="Primary" />
        </HdsDialogPrimitiveFooter>
      </SF.Item>
      <SF.Item @label="Two actions">
        <HdsDialogPrimitiveFooter>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Primary" />
            <HdsButton type="button" @text="Secondary" @color="secondary" />
          </HdsButtonSet>
        </HdsDialogPrimitiveFooter>
      </SF.Item>
      <SF.Item @label="Three actions">
        <HdsDialogPrimitiveFooter>
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
        </HdsDialogPrimitiveFooter>
      </SF.Item>
      <SF.Item @label="Generic footer content">
        <HdsDialogPrimitiveFooter>
          <ShwPlaceholder @text="some generic content" @height="50" />
        </HdsDialogPrimitiveFooter>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveOverlay</ShwTextH2>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Overlay element">
        <div class="shw-utility-dialog-primitive-overlay-container">
          <HdsDialogPrimitiveOverlay />
        </div>
      </SF.Item>
    </ShwFlex>
  </div>
</template>;

export default SubSectionBaseElements;
