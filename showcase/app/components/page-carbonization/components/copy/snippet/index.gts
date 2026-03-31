import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsCopySnippet,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

import {
  COLORS,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/snippet/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];
const COPY_STATUSES = ['success', 'error'];

export default class CopySnippetCarbonizationIndex extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-snippet--status-idle');
      element.classList.add(`hds-copy-snippet--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${SUCCESS_ICON}-16`);
          }, 100);
        } else if (status === 'error') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${ERROR_ICON}-16`);
          }, 100);
        }
      }
    });
  });

  <template>
    {{pageTitle "CopySnippet - Carbonization"}}

    <ShwTextH1>CopySnippet - Carbonization</ShwTextH1>

    <section>

      <ShwTextH2>Content</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCopySnippet @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r" />
            </SF.Item>
            <SF.Item>
              <div {{style width="300px"}}>
                <HdsCopySnippet
                  @textToCopy="With some really long text that should wrap and be multi-line"
                />
              </div>
            </SF.Item>
            <SF.Item>
              <div {{style width="300px"}}>
                <HdsCopySnippet
                  @textToCopy="With some really long text that should be truncated because isTruncated is set to true"
                  @isTruncated={{true}}
                />
              </div>
            </SF.Item>
            <SF.Item>
              <HdsCopySnippet @textToCopy="" />
            </SF.Item>
            <SF.Item>
              <HdsCopySnippet @textToCopy={{123456789}} />
            </SF.Item>
            <SF.Item>
              <HdsCopySnippet @textToCopy={{0}} />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Colors</ShwTextH2>

      {{#each COLORS as |color|}}
        <ShwCarbonizationComparisonGrid @label={{color}}>
          <:theming>
            <HdsCopySnippet
              @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
              @color={{color}}
            />
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwDivider @level={{2}} />

      <ShwTextH2>Full Width</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <div {{style width="500px"}}>
            <HdsCopySnippet
              @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
              @isFullWidth={{true}}
            />
          </div>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>States</ShwTextH2>

      <div {{this.replaceCopyStatus}}>
        {{#each COLORS as |color|}}
          <ShwTextH3>{{capitalize color}}</ShwTextH3>
          {{#each STATES as |state|}}
            <ShwCarbonizationComparisonGrid @label={{state}}>
              <:theming>
                <HdsCopySnippet
                  @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              </:theming>
              <:reference as |R|>
                <R.NoEquivalent @isCompact={{true}} />
              </:reference>
            </ShwCarbonizationComparisonGrid>
          {{/each}}
          {{! Note: HdsIcons are needed to load the svgs for the copy button statuses }}
          <HdsIcon @name="clipboard-checked" {{style display="none"}} />
          <HdsIcon @name="clipboard-x" {{style display="none"}} />
          <div {{this.replaceCopyStatus}}>
            {{#each COPY_STATUSES as |status|}}
              <ShwCarbonizationComparisonGrid @label={{status}}>
                <:theming>
                  <HdsCopySnippet
                    @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                    @color={{color}}
                    mock-copy-status={{status}}
                  />
                </:theming>
                <:reference as |R|>
                  <R.NoEquivalent @isCompact={{true}} />
                </:reference>
              </ShwCarbonizationComparisonGrid>
            {{/each}}
          </div>
        {{/each}}
      </div>

    </section>
  </template>
}
