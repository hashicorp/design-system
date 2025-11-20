import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import MockApp from 'showcase/components/mock/app';
import NOOP from 'showcase/utils/noop';

import {
  HdsAlert,
  HdsApplicationState,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsCodeBlock,
  HdsFlyout,
  HdsLinkInline,
  HdsModal,
  HdsRichTooltip,
  HdsTabs,
  HdsTextBody,
  HdsTextDisplay,
  HdsThemeSwitcher,
  HdsToast,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';

export default class PageFoundationsThemingFramelessDemoApplicationWithThemeSwitcher extends Component {
  @tracked isFlyoutOpen = false;
  @tracked isModalOpen = false;

  openFlyout = () => {
    this.isFlyoutOpen = true;
  };

  closeFlyout = () => {
    this.isFlyoutOpen = false;
  };

  openModal = () => {
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
  };

  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <MockApp @hasPageAlert={{true}}>
      <:sidebar as |S|>
        <S.SideNav>
          <:extraBodyAfter>
            <div {{style margin-top="16px"}}>
              <HdsThemeSwitcher
                @toggleSize="medium"
                @toggleIsFullWidth={{true}}
                @hasDefaultOption={{true}}
              />
            </div>
          </:extraBodyAfter>
        </S.SideNav>
      </:sidebar>
      <:main as |M|>
        <M.PageHeader @showActionButton={{true}} @showActionDropdown={{true}} />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Text</HdsTextDisplay>

        <HdsTabs as |T|>
          <T.Tab>Text components</T.Tab>
          <T.Tab>Helper classes</T.Tab>
          <T.Tab>Tokens</T.Tab>
          <T.Panel {{style padding-top="16px"}}>
            <M.GenericTextContent @showHeadings={{true}} />
          </T.Panel>
          <T.Panel {{style padding-top="16px"}}>
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <h2
                  class="hds-typography-display-200 hds-foreground-strong"
                >Heading with hds-typography-display-500 / hds-foreground-strong</h2>
              </SF.Item>
              <SF.Item>
                <p
                  class="hds-typography-body-300 hds-foreground-primary"
                >Paragraph with hds-typography-body-300 / hds-foreground-primary</p>
              </SF.Item>
              <SF.Item>
                <code
                  class="hds-typography-code-300 hds-foreground-success"
                >Code with hds-typography-code-300 / hds-foreground-success</code>
              </SF.Item>
            </ShwFlex>
          </T.Panel>
          <T.Panel {{style padding-top="16px"}}>
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <h2
                  {{style
                    font-family="var(--token-typography-display-200-font-family)"
                    font-size="var(--token-typography-display-200-font-size)"
                    line-height="var(--token-typography-display-200-line-height)"
                    color="var(--token-color-foreground-strong)"
                    margin="0"
                  }}
                >Heading with --token-typography-display-200-font-family /
                  --token-typography-display-200-font-size /
                  --token-typography-display-200-line-height /
                  --token-color-foreground-strong</h2>
              </SF.Item>
              <SF.Item>
                <p
                  {{style
                    font-family="var(--token-typography-body-300-font-family)"
                    font-size="var(--token-typography-body-300-font-size)"
                    line-height="var(--token-typography-body-300-line-height)"
                    color="var(--token-color-foreground-primary)"
                    margin="0"
                  }}
                >Paragraph with --token-typography-body-300-font-family /
                  --token-typography-body-300-font-size /
                  --token-typography-body-300-line-height /
                  --token-color-foreground-primary</p>
              </SF.Item>
              <SF.Item>
                <code
                  {{style
                    font-family="var(--token-typography-code-300-font-family)"
                    font-size="var(--token-typography-code-300-font-size)"
                    line-height="var(--token-typography-code-300-line-height)"
                    color="var(--token-color-foreground-success)"
                    margin="0"
                  }}
                >Code with --token-typography-code-300-font-family /
                  --token-typography-code-300-font-size /
                  --token-typography-code-300-line-height /
                  --token-color-foreground-success</code>
              </SF.Item>
            </ShwFlex>
          </T.Panel>
        </HdsTabs>

        <ShwDivider />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Table</HdsTextDisplay>

        <M.TableComplex @showFilters={{true}} @showPagination={{true}} />

        <ShwDivider />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Form</HdsTextDisplay>

        <M.FormComplex @showAll={{true}} />

        <ShwDivider />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Overlays</HdsTextDisplay>

        <ShwFlex @direction="column" as |SF|>
          <SF.Item>

            <button type="button" {{on "click" this.openFlyout}}>Open flyout</button>

            {{#if this.isFlyoutOpen}}
              <HdsFlyout @onClose={{this.closeFlyout}} as |F|>
                <F.Header @tagline="Tagline" @icon="info">
                  Title
                </F.Header>
                <F.Description>Lorem ipsum dolor sit amet</F.Description>
                <F.Body>
                  <M.GenericTextContent />
                </F.Body>
                <F.Footer as |FF|>
                  <HdsButtonSet>
                    <HdsButton
                      type="button"
                      @text="Primary"
                      {{on "click" FF.close}}
                    />
                    <HdsButton
                      type="button"
                      @text="Secondary"
                      @color="secondary"
                      {{on "click" FF.close}}
                    />
                    <HdsButton
                      type="button"
                      @text="Tertiary"
                      @color="tertiary"
                      @icon="arrow-right"
                      @iconPosition="trailing"
                      {{on "click" FF.close}}
                    />
                  </HdsButtonSet>
                </F.Footer>
              </HdsFlyout>
            {{/if}}

          </SF.Item>
          <SF.Item>

            <button type="button" {{on "click" this.openModal}}>Open modal</button>

            {{#if this.isModalOpen}}
              <HdsModal @color="critical" @onClose={{this.closeModal}} as |MM|>
                <MM.Header @tagline="Tagline" @icon="alert-diamond">
                  Title
                </MM.Header>
                <MM.Body>
                  <M.GenericTextContent />
                </MM.Body>
                <MM.Footer as |F|>
                  <HdsButtonSet>
                    <HdsButton
                      type="button"
                      @text="Primary"
                      @color="critical"
                      {{on "click" F.close}}
                    />
                    <HdsButton
                      type="button"
                      @text="Secondary"
                      @color="secondary"
                      {{on "click" F.close}}
                    />
                    <HdsButton
                      type="button"
                      @text="Tertiary"
                      @color="tertiary"
                      @icon="plus"
                      {{on "click" F.close}}
                    />
                  </HdsButtonSet>
                </MM.Footer>
              </HdsModal>
            {{/if}}

          </SF.Item>
          <SF.Item>

            <HdsTooltipButton
              aria-label="Information"
              @text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
              <HdsBadge @icon="info" @text="Open tooltip" />
            </HdsTooltipButton>

          </SF.Item>
          <SF.Item>

            <HdsRichTooltip as |RT|>
              <RT.Toggle @text="Open rich tooltip" @isInline={{true}} />
              <RT.Bubble>
                <HdsTextBody @tag="p" size="100">Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.</HdsTextBody>
              </RT.Bubble>
            </HdsRichTooltip>

          </SF.Item>
        </ShwFlex>

        <ShwDivider />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Alerts</HdsTextDisplay>

        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsAlert @type="page" @color="success" as |A|>
              <A.Title>Lorem ipsum</A.Title>
              <A.Description>Lorem ipsum dolor sit amet.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert @type="inline" @color="warning" as |A|>
              <A.Title>Lorem ipsum</A.Title>
              <A.Description>Lorem ipsum dolor sit amet.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert @type="compact" @color="critical" as |A|>
              <A.Title>Lorem ipsum</A.Title>
              <A.Description>Lorem ipsum dolor sit amet.</A.Description>
            </HdsAlert>
          </SF.Item>
        </ShwFlex>

        <ShwDivider @level={{2}} />

        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
              <T.Title>A toast with a rich description (HTML)</T.Title>
              <T.Description>Using the
                <code>A.Description</code>
                contextual component it's possible to have content that contains
                HTML tags, like
                <strong>strong text</strong>
                and
                <em>emphasized text</em>
                as well as
                <code>code</code>,
                <pre>pre</pre>
                and
                <a href="#">inline links</a>.</T.Description>
            </HdsToast>
          </SF.Item>
          <SF.Item>
            <HdsToast @color="warning" as |A|>
              <A.Title>A toast comparing different types of links in the
                description</A.Title>
              <A.Description>
                Description with
                <a href="#">HTML link</a>
                compared with
                <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
                and
                <HdsLinkInline @href="#" @color="secondary">Secondary
                  HdsLinkInline</HdsLinkInline>.
              </A.Description>
            </HdsToast>
          </SF.Item>
          <SF.Item>
            <HdsToast @color="critical" @onDismiss={{NOOP}} as |T|>
              <T.Title>With multiple actions passed as yielded components</T.Title>
              <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</T.Description>
              <T.Button @text="Secondary" @color="secondary" />
              <T.Button @icon="plus" @text="Tertiary" @color="tertiary" />
              <T.LinkStandalone
                @icon="plus"
                @text="Standalone"
                @href="#"
                @color="secondary"
              />
            </HdsToast>
          </SF.Item>
        </ShwFlex>

        <ShwDivider @level={{2}} />

        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsApplicationState as |A|>
              <A.Header
                @title="Empty state title"
                @icon="alert-circle"
                @errorCode="404"
              />
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
        </ShwFlex>

        <ShwDivider />

        <HdsTextDisplay
          @tag="h1"
          @size="500"
          {{style margin="32px 0 24px"}}
        >Code blocks</HdsTextDisplay>
        <ShwGrid @columns={{1}} as |SG|>
          <SG.Item @forceMinWidth={{true}}>
            {{! template-lint-disable no-whitespace-for-layout }}
            <HdsCodeBlock
              id="clipboardTarget2"
              @hasCopyButton={{true}}
              @hasLineNumbers={{true}}
              @highlightLines="4-6, 11"
              @language="ruby"
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
              as |CB|
            >
              <CB.Title>Title</CB.Title>
              <CB.Description>Description</CB.Description>
            </HdsCodeBlock>
            {{! template-lint-enable no-whitespace-for-layout }}
          </SG.Item>
        </ShwGrid>

      </:main>
    </MockApp>
  </template>
}
