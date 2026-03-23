import Component from '@glimmer/component';
import { service } from '@ember/service';

import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';

import {
  HdsAppFooter,
  HdsCodeBlock,
  HdsThemeSwitcher,
  HdsThemeContext,
} from '@hashicorp/design-system-components/components';

import ShwThemingService from 'showcase/services/shw-theming';

export default class SubSectionComponents extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  <template>
    <ShwTextH2>"Themed" components</ShwTextH2>

    <ShwTextH4 @tag="h3">AppFooter</ShwTextH4>

    {{#if (eq this.shwTheming.currentStylesheet "standard")}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied,
          please select a theme in the selector at the top of the page</ShwTextBody>
      </div>
    {{else}}
      <ShwFlex @direction="column" as |SF|>
        <SF.Item as |SFI|>
          <SFI.Label>&lt;AppFooter @theme=light&gt;</SFI.Label>
          <div class="shw-foundation-theming-light-background">
            <HdsAppFooter @theme="light" as |AF|>
              <AF.ExtraBefore>
                <HdsThemeSwitcher />
              </AF.ExtraBefore>
              <AF.StatusLink @status="operational" />
              <AF.Link
                @href="https://cloud.hashicorp.com/docs/changelog"
              >Changelog</AF.Link>
              <AF.LegalLinks />
            </HdsAppFooter>
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label>&lt;AppFooter @theme=light&gt; / with &lt;HdsThemeContext
            @context=dark&gt; wrapper</SFI.Label>
          <div class="shw-foundation-theming-dark-background">
            <HdsThemeContext @context="dark">
              <HdsAppFooter as |AF|>
                <AF.ExtraBefore>
                  <HdsThemeSwitcher />
                </AF.ExtraBefore>
                <AF.StatusLink @status="operational" />
                <AF.Link
                  @href="https://cloud.hashicorp.com/docs/changelog"
                >Changelog</AF.Link>
                <AF.LegalLinks />
              </HdsAppFooter>
            </HdsThemeContext>
          </div>
        </SF.Item>
      </ShwFlex>
    {{/if}}

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">CodeBlock</ShwTextH4>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="default">
        {{! template-lint-disable no-whitespace-for-layout }}
        <HdsCodeBlock
          @language="go"
          @value="package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet'
  fmt.Println(res)
}"
          @hasLineNumbers={{true}}
          @hasCopyButton={{true}}
          @highlightLines="2"
          as |CB|
        >
          <CB.Title>Title</CB.Title>
          <CB.Description>Description</CB.Description>
        </HdsCodeBlock>
        {{! template-lint-enable no-whitespace-for-layout }}
      </SF.Item>
    </ShwFlex>
  </template>
}
