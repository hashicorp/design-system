import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsCodeBlock,
  HdsCodeBlockCopyButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

const STATES = ['default', 'hover', 'active', 'focus'];
const COPY_STATUSES = ['success', 'error'];

export default class CodeBlockCarbonizationIndex extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-button--status-idle');
      element.classList.add(`hds-copy-button--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${SUCCESS_ICON}-16`);
          }, 3000);
        } else if (status === 'error') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${ERROR_ICON}-16`);
          }, 3000);
        }
      }
    });
  });

  <template>
    {{pageTitle "CodeBlock - Carbonization"}}

    <ShwTextH1>CodeBlock - Carbonization</ShwTextH1>

    <section>

      <ShwTextH2>Content</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeBlock
                @language="shell-session"
                @ariaLabel="one line"
                @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
                @hasLineNumbers={{false}}
              />
            </SF.Item>
            <SF.Item>
              <HdsCodeBlock
                @language="go"
                @ariaLabel="multi-line"
                @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet'
    fmt.Println(res)
  }"
                @hasLineNumbers={{false}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <cds-code-snippet type="multi">aws ec2 --region us-west-1
                accept-vpc-peering-connection</cds-code-snippet>
            </SF.Item>
            <SF.Item>
              <cds-code-snippet type="multi">package main import 'fmt' func
                main() { res = 'Lorem ipsum dolor sit amet' fmt.Println(res) }</cds-code-snippet>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Title and Description</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeBlock
                @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
                @language="ruby"
                @hasLineNumbers={{false}}
                as |CB|
              >
                <CB.Title>Title</CB.Title>
                <CB.Description>Description text that provides context</CB.Description>
              </HdsCodeBlock>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Line Numbers</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeBlock
                @language="go"
                @hasLineNumbers={{true}}
                @ariaLabel="with line numbers"
                @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet'
    fmt.Println(res)
  }"
              />
            </SF.Item>
            <SF.Item>
              <HdsCodeBlock
                @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
                @language="ruby"
                @hasLineNumbers={{true}}
                as |CB|
              >
                <CB.Title>Title</CB.Title>
                <CB.Description>Description text that provides context</CB.Description>
              </HdsCodeBlock>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Copy Button</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeBlock
                @language="shell-session"
                @hasCopyButton={{true}}
                @ariaLabel="with copy button"
                @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet'
    fmt.Println(res)
  }"
                @hasLineNumbers={{false}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <cds-code-snippet
                type="multi"
                copy-button-description="Copy code"
              >package main import 'fmt' func main() { res = 'Lorem ipsum dolor
                sit amet' fmt.Println(res) }</cds-code-snippet>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Height limit</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              {{! template-lint-disable no-whitespace-for-layout }}
              <HdsCodeBlock
                @language="ruby"
                @maxHeight="130px"
                @ariaLabel="maxHeight='130px'"
                @hasLineNumbers={{false}}
                @value="def convert_object_to_array(obj)
  arr = obj.keys
          .map { |key| [key, obj[key]] }
          .flatten
          .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
              />
              {{! template-lint-enable no-whitespace-for-layout }}
            </SF.Item>
            <SF.Item>
              {{! template-lint-disable no-whitespace-for-layout }}
              <HdsCodeBlock
                @language="ruby"
                @maxHeight="130px"
                @ariaLabel="maxHeight='130px'"
                @value="def convert_object_to_array(obj)
  arr = obj.keys
          .map { |key| [key, obj[key]] }
          .flatten
          .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
              />
              {{! template-lint-enable no-whitespace-for-layout }}
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <div>
            {{! template-lint-disable no-whitespace-for-layout }}
            <cds-code-snippet type="multi" maxcollapsednumberofrows="6">def
              convert_object_to_array(obj) arr = obj.keys .map { |key| [key,
              obj[key]] } .flatten .sort return arr end def
              assert_objects_equal(actual, expected, test_name) actual_str =
              convert_object_to_array(actual).to_s expected_str =
              convert_object_to_array(expected).to_s puts 'ACTUAL: #{actual_str}
              EXPECTED: #{expected_str}' if actual_str == expected_str puts
              'passed' else puts 'FAILED [#{test_name}] Expected #{expected},
              but got #{actual}' end end
            </cds-code-snippet>
            {{! template-lint-enable no-whitespace-for-layout }}
          </div>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Line Wrapping</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <div {{style width="300px"}}>
                <HdsCodeBlock
                  @language="ruby"
                  @hasLineWrapping={{false}}
                  @hasLineNumbers={{false}}
                  @ariaLabel="hasLineWrapping=false (default)"
                  @value="codeLang='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';"
                />
              </div>
            </SF.Item>
            <SF.Item>
              <div {{style width="300px"}}>
                <HdsCodeBlock
                  @language="ruby"
                  @hasLineWrapping={{true}}
                  @hasLineNumbers={{false}}
                  @ariaLabel="hasLineWrapping=true"
                  @value="codeLang='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';"
                />
              </div>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <div {{style width="300px"}}>
                <cds-code-snippet type="multi">codeLang='Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam';</cds-code-snippet>
              </div>
            </SF.Item>
            <SF.Item>
              <div {{style width="300px"}}>
                <cds-code-snippet type="multi" wrap-text="true">codeLang='Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam';</cds-code-snippet>
              </div>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Highlight lines</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex as |SF|>
            <SF.Item {{style width="500px"}}>
              <HdsCodeBlock
                @language="go"
                @hasLineNumbers={{false}}
                @highlightLines="2, 4"
                @ariaLabel="Highlight lines 2 & 4, hasLineNumbers=false"
                @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    fmt.Println(res)
  }"
              />
            </SF.Item>
            <SF.Item {{style width="500px"}}>
              {{! template-lint-disable no-whitespace-for-layout }}
              <HdsCodeBlock
                @language="ruby"
                @highlightLines="10-12"
                @ariaLabel="Highlight lines 10-12"
                @value="def convert_object_to_array(obj)
    arr = obj.keys
            .map { |key| [key, obj[key]] }
            .flatten
            .sort
    return arr
  end

  def assert_objects_equal(actual, expected, test_name)
    actual_str = convert_object_to_array(actual).to_s
    expected_str = convert_object_to_array(expected).to_s
    puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
    if actual_str == expected_str
      puts 'passed'
    else
      puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
    end
  end"
              />
              {{! template-lint-enable no-whitespace-for-layout }}
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Base elements</ShwTextH2>

      <ShwTextH3>CopyButton</ShwTextH3>

      <span
        class="shw-component-code-block-display-none"
        id="test-target"
        {{style display="none"}}
      >Copy me</span>

      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
              <SF.Item class="shw-component-code-block-copy-button">
                <HdsCodeBlockCopyButton
                  mock-state-value={{state}}
                  @targetToCopy="#test-target"
                  class="hds-code-block--theme-dark"
                />
              </SF.Item>
            </ShwFlex>
          </:theming>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      {{! Note: HdsIcons are needed to preload the SVGs for the copy button statuses }}
      <HdsIcon @name="clipboard-checked" {{style display="none"}} />
      <HdsIcon @name="clipboard-x" {{style display="none"}} />
      <div {{this.replaceCopyStatus}}>
        {{#each COPY_STATUSES as |status|}}
          <ShwCarbonizationComparisonGrid @label={{status}}>
            <:theming>
              <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
                <SF.Item class="shw-component-code-block-copy-button">
                  <HdsCodeBlockCopyButton
                    mock-copy-status={{status}}
                    @targetToCopy="#test-target"
                    class="hds-code-block--theme-dark"
                  />
                </SF.Item>
              </ShwFlex>
            </:theming>
          </ShwCarbonizationComparisonGrid>
        {{/each}}
      </div>

    </section>
  </template>
}
