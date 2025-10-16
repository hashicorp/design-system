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
  HdsModal,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>Header</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With icon" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-icon" as |M|>
        <M.Header @icon="info">
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
    <SF.Item @label="With tagline" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-tagline" as |M|>
        <M.Header @tagline="Tagline">
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
    <SF.Item
      @label="With tagline and icon"
      class="shw-component-modal-sample-item"
    >
      <HdsModal open id="modal-example-tagline-icon" as |M|>
        <M.Header @tagline="Tagline" @icon="info">
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH2>Body</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With basic style" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-basic-content" as |M|>
        <M.Header @tagline="Tagline" @icon="info">
          A very, very long title that spans multiple lines to test this element
        </M.Header>
        <M.Body>
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
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
    <SF.Item
      @label="With generic content"
      class="shw-component-modal-sample-item"
    >
      <HdsModal open id="modal-example-generic-content" as |M|>
        <M.Header>
          Title
        </M.Header>
        <M.Body>
          <ShwPlaceholder @text="some generic content" @height="50" />
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH2>Footer</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="One action" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-one-action" as |M|>
        <M.Header>
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
    <SF.Item @label="Two actions" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-two-actions" as |M|>
        <M.Header>
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
    <SF.Item @label="Three actions" class="shw-component-modal-sample-item">
      <HdsModal open id="modal-example-three-actions" as |M|>
        <M.Header>
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Confirm" />
            <HdsButton type="button" @text="Cancel" @color="secondary" />
            <HdsButton
              type="button"
              @text="Tertiary"
              @color="tertiary"
              @icon="plus"
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
