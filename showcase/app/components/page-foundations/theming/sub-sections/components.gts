import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsAppFooter,
  HdsCodeBlock,
  HdsThemeSwitcher,
} from '@hashicorp/design-system-components/components';

const SubSectionComponents: TemplateOnlyComponent = <template>
  <ShwTextH2>"Themed" components</ShwTextH2>

  <ShwTextH4 @tag="h3">AppFooter</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="theme=light">
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
    <SF.Item @label="theme=dark">
      <div class="shw-foundation-theming-dark-background">
        <HdsAppFooter @theme="dark" as |AF|>
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
  </ShwFlex>

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
</template>;

export default SubSectionComponents;
