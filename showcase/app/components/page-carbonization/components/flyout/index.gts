import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { modifier } from 'ember-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFlyout,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

export default class FlyoutCarbonizationIndex extends Component {
  forceStaticC4PSidePanel = modifier((element: HTMLElement) => {
    const TAG = 'c4p-side-panel';
    const STYLE_ID = 'shw-carbonization-c4p-side-panel-force-static';
    let observer: MutationObserver | undefined;
    let isDestroyed = false;

    const applyToHost = (host: Element) => {
      if (!(host instanceof HTMLElement) || !host.shadowRoot) {
        return false;
      }

      let style = host.shadowRoot.querySelector(`#${STYLE_ID}`);
      if (!style) {
        style = document.createElement('style');
        style.id = STYLE_ID;
        host.shadowRoot.appendChild(style);
      }

      style.textContent = `
        .c4p--side-panel {
          position: static !important;
          inset: auto !important;
          top: auto !important;
          right: auto !important;
          bottom: auto !important;
          left: auto !important;
          z-index: auto !important;
          block-size: 300px !important;
        }
        .c4p--side-panel__title {
          position: static !important;
        }
        .c4p--side-panel__actions-container {
          position: static !important;
        }
      `;

      return true;
    };

    const applyAll = () => {
      let updated = 0;

      element.querySelectorAll(TAG).forEach((host) => {
        if (applyToHost(host)) {
          updated++;
        }
      });

      return updated;
    };

    void customElements.whenDefined(TAG).then(() => {
      if (isDestroyed) {
        return;
      }

      applyAll();
      observer = new MutationObserver(() => applyAll());
      observer.observe(element, { childList: true, subtree: true });
    });

    return () => {
      isDestroyed = true;
      observer?.disconnect();
    };
  });

  <template>
    {{pageTitle "Flyout - Carbonization"}}

    <ShwTextH1>Flyout - Carbonization</ShwTextH1>

    <section {{this.forceStaticC4PSidePanel}}>
      <ShwTextH2>Content</ShwTextH2>

      <ShwTextH3>Header</ShwTextH3>

      <ShwCarbonizationComparisonGrid
        @label="Title with icon"
        @layout="side-by-side"
      >
        <:theming>
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
        </:theming>
        <:reference>
          <c4p-side-panel open size="md" title="Title" animate-title="false">
            <p>Flyout content</p>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>
      <ShwCarbonizationComparisonGrid
        @label="Title with tagline"
        @layout="side-by-side"
      >
        <:theming>
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
        </:theming>
        <:reference>
          <c4p-side-panel
            open
            size="md"
            title="Title"
            label-text="Tagline"
            animate-title="false"
          >
            <p>Flyout content</p>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>
      <ShwCarbonizationComparisonGrid
        @label="Title with tagline and icon"
        @layout="side-by-side"
      >
        <:theming>
          <HdsFlyout open id="flyout-example-tagline-icon" as |F|>
            <F.Header @tagline="Tagline" @icon="info">
              Title
            </F.Header>
            <F.Body>
              <p class="hds-typography-body-300 hds-foreground-primary">
                Flyout content
              </p>
            </F.Body>
          </HdsFlyout>
        </:theming>
        <:reference>
          <c4p-side-panel
            open
            size="md"
            title="Title"
            label-text="Tagline"
            animate-title="false"
          >
            <p>Flyout content</p>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>
      <ShwCarbonizationComparisonGrid
        @label="Title with description"
        @layout="side-by-side"
      >
        <:theming>
          <HdsFlyout open id="flyout-example-description" as |F|>
            <F.Header>
              Title
            </F.Header>
            <F.Description>
              Lorem ipsum dolor
            </F.Description>
            <F.Body>
              <p class="hds-typography-body-300 hds-foreground-primary">
                Flyout content
              </p>
            </F.Body>
          </HdsFlyout>
        </:theming>
        <:reference>
          <c4p-side-panel
            open
            size="md"
            title="Title"
            label-text="Tagline"
            animate-title="false"
          >
            <div slot="subtitle">Lorem ipsum dolor</div>
            <p>Flyout content</p>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3 @tag="h2">Body</ShwTextH3>

      <ShwCarbonizationComparisonGrid
        @label="With basic style + Generic content"
        @layout="side-by-side"
      >
        <:theming>
          <HdsFlyout open id="flyout-example-basic-style" as |F|>
            <F.Header @tagline="Tagline" @icon="info">
              Title
            </F.Header>
            <F.Description>
              Description
            </F.Description>
            <F.Body tabindex="0">
              <p class="hds-typography-body-300 hds-foreground-primary">Lorem
                ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>This is some unstyled generic content to test the inheritance
                of styles, in particular the text color.</p>

            </F.Body>
          </HdsFlyout>
        </:theming>
        <:reference>
          <c4p-side-panel
            open
            size="md"
            title="Title"
            label-text="Tagline"
            animate-title="false"
          >
            <div slot="subtitle">Lorem ipsum dolor</div>
            <p>Flyout content</p>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3 @tag="h2">Footer</ShwTextH3>

      <ShwCarbonizationComparisonGrid
        @label="One action"
        @layout="side-by-side"
      >
        <:theming>
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
        </:theming>
        <:reference>
          <c4p-side-panel open size="md" title="Title" animate-title="false">
            <div slot="subtitle">Lorem ipsum dolor</div>
            <p>Flyout content</p>
            <cds-button slot="actions" kind="primary">Primary</cds-button>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>
      <ShwCarbonizationComparisonGrid
        @label="Two actions"
        @layout="side-by-side"
      >
        <:theming>
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
        </:theming>
        <:reference>
          <c4p-side-panel open size="md" title="Title" animate-title="false">
            <p>Flyout content</p>
            <cds-button slot="actions" kind="primary">Primary</cds-button>
            <cds-button slot="actions" kind="secondary">Secondary</cds-button>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>
      <ShwCarbonizationComparisonGrid
        @label="Three actions"
        @layout="side-by-side"
      >
        <:theming>
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
        </:theming>
        <:reference>
          <c4p-side-panel open size="md" title="Title" animate-title="false">
            <p>Flyout content</p>
            <cds-button slot="actions" kind="primary">Primary</cds-button>
            <cds-button slot="actions" kind="secondary">Secondary</cds-button>
            <cds-button slot="actions" kind="ghost">Tertiary</cds-button>
          </c4p-side-panel>
        </:reference>
      </ShwCarbonizationComparisonGrid>

    </section>
  </template>
}
