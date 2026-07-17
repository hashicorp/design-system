/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

// Import Helios Design System components
import {
  HdsAppFrame,
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsDropdown,
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormTextInputField,
  HdsAlert,
  HdsAccordion,
  HdsModal,
  HdsPageHeader,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

export default class SubSectionHeliosDemoApp extends Component {
  @tracked nameValue = '';
  @tracked emailValue = '';
  @tracked showFormErrors = false;
  @tracked isModalOpen = false;

  updateName = (event: Event) => {
    this.nameValue = (event.target as HTMLInputElement).value;
  };

  updateEmail = (event: Event) => {
    this.emailValue = (event.target as HTMLInputElement).value;
  };

  openPreviewModal = (event: Event) => {
    event.preventDefault();
    // Validate before showing preview
    if (!this.nameValue || !this.emailValue) {
      this.showFormErrors = true;
    } else {
      this.showFormErrors = false;
      this.isModalOpen = true;
    }
  };

  closeModal = () => {
    this.isModalOpen = false;
  };

  confirmSubmit = () => {
    this.isModalOpen = false;
    alert(
      `Form submitted successfully!\nName: ${this.nameValue}\nEmail: ${this.emailValue}`,
    );
    // Reset form
    this.nameValue = '';
    this.emailValue = '';
  };

  cancelForm = () => {
    this.nameValue = '';
    this.emailValue = '';
    this.showFormErrors = false;
  };

  get isNameEmpty() {
    return this.showFormErrors && !this.nameValue;
  }

  get isEmailEmpty() {
    return this.showFormErrors && !this.emailValue;
  }

  <template>
    <ShwTextH2>Helios Design System Demo</ShwTextH2>

    <ShwTextBody>
      A full application layout using Helios Design System components including
      AppFrame, AppHeader, AppSideNav, and Form with Text Inputs.
    </ShwTextBody>

    <div class="helios-demo-app-container">
      <HdsAppFrame @hasHeader={{true}} @hasSidebar={{true}} as |Frame|>
        <Frame.Header>
          <HdsAppHeader @hasA11yRefocus={{false}}>
            <:logo as |actions|>
              <HdsAppHeaderHomeLink
                @icon="hashicorp"
                @text="HashiCorp"
                @href="#"
                {{on "click" actions.close}}
              />
            </:logo>

            <:globalActions as |actions|>
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleButton @text="my-organization" @icon="org" />
                <dd.Checkmark {{on "click" actions.close}}>
                  my-organization
                </dd.Checkmark>
              </HdsDropdown>
            </:globalActions>

            <:utilityActions>
              <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="help" @text="help menu" />
                <dd.Title @text="Help & Support" />
                <dd.Interactive @href="#">Documentation</dd.Interactive>
                <dd.Interactive @href="#">Tutorials</dd.Interactive>
                <dd.Separator />
                <dd.Interactive @href="#">Create support ticket</dd.Interactive>
              </HdsDropdown>
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="user" @text="user menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="HiHDSTeam@ibm.com" />
                <dd.Interactive @href="#">Account Settings</dd.Interactive>
              </HdsDropdown>
            </:utilityActions>
          </HdsAppHeader>
        </Frame.Header>

        <Frame.Sidebar>
          <HdsAppSideNav @isResponsive={{true}} @isCollapsible={{true}}>
            <HdsAppSideNavList aria-label="Dashboard" as |SNL|>
              <SNL.Link
                @icon="dashboard"
                @text="Dashboard"
                @isActive={{true}}
              />
            </HdsAppSideNavList>
            <HdsAppSideNavList aria-label="Services" as |SNL|>
              <SNL.Title>Services</SNL.Title>
              <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
              <SNL.Link @text="Consul" @icon="consul" @href="#" />
              <SNL.Link @text="Packer" @icon="packer" @href="#" />
              <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
              <SNL.Link @text="Vault" @icon="vault" @href="#" />
              <SNL.Link
                @text="Waypoint"
                @icon="waypoint"
                @badge="Alpha"
                @href="#"
              />
            </HdsAppSideNavList>
            <HdsAppSideNavList aria-label="Organization" as |SNL|>
              <SNL.Title>Organization</SNL.Title>
              <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
              <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
              <SNL.Link @text="Settings" @icon="settings" @href="#" />
            </HdsAppSideNavList>
          </HdsAppSideNav>
        </Frame.Sidebar>

        <Frame.Main>
          <div class="helios-demo-app-main-content">
            <HdsPageHeader as |PH|>
              <PH.Title>Page title</PH.Title>
              <PH.Description>
                Fill out the form below to submit your information. This
                demonstrates the HDS Form component with text input fields and
                validation.
              </PH.Description>
            </HdsPageHeader>

            {{! Accordion Section }}
            <div class="helios-demo-app-accordion-section">
              <h4>Form Help & Information</h4>
              <HdsAccordion as |A|>
                <A.Item @isOpen={{true}}>
                  <:toggle>How to fill out this form</:toggle>
                  <:content>
                    <HdsTextBody>
                      <p>
                        This form collects basic user information. Please ensure
                        all required fields are completed before submitting.
                      </p>
                      <ul>
                        <li>
                          <strong>Full Name:</strong>
                          Enter your complete first and last name
                        </li>
                        <li>
                          <strong>Email Address:</strong>
                          Provide a valid email address for contact purposes
                        </li>
                      </ul>
                    </HdsTextBody>
                  </:content>
                </A.Item>
                <A.Item>
                  <:toggle>Privacy & Data Usage</:toggle>
                  <:content>
                    <HdsTextBody>
                      <p>
                        Your information is secure and will only be used for the
                        purposes stated in our privacy policy.
                      </p>
                      <ul>
                        <li>We never share your email with third parties</li>
                        <li>Your data is encrypted and stored securely</li>
                        <li>You can request data deletion at any time</li>
                      </ul>
                    </HdsTextBody>
                  </:content>
                </A.Item>
                <A.Item>
                  <:toggle>Frequently Asked Questions</:toggle>
                  <:content>
                    <HdsTextBody>
                      <p>
                        <strong>Q: Is this form required?</strong>
                        <br />
                        A: Yes, all fields marked as required must be completed.
                      </p>
                      <p>
                        <strong>Q: Can I edit my information later?</strong>
                        <br />
                        A: Yes, you can update your information at any time
                        through your account settings.
                      </p>
                    </HdsTextBody>
                  </:content>
                </A.Item>
              </HdsAccordion>
            </div>

            {{! Form Section }}
            <div class="helios-demo-app-form-section">
              <HdsForm as |F|>
                {{! Form-level alert }}
                {{#if this.showFormErrors}}
                  <F.Section>
                    <HdsAlert
                      @type="inline"
                      @color="critical"
                      tabindex="-1"
                      as |A|
                    >
                      <A.Title @tag="h2">Form submission error</A.Title>
                      <A.Description>
                        Please fill out all required fields before submitting.
                      </A.Description>
                    </HdsAlert>
                  </F.Section>
                {{/if}}

                {{! Form fields }}
                <F.Section>
                  {{! Name field }}
                  <HdsFormTextInputField
                    @value={{this.nameValue}}
                    name="name"
                    {{on "input" this.updateName}}
                    as |Field|
                  >
                    <Field.Label>Full Name</Field.Label>
                    <Field.HelperText>
                      Enter your first and last name.
                    </Field.HelperText>
                    {{#if this.isNameEmpty}}
                      <Field.Error>Name is required.</Field.Error>
                    {{/if}}
                  </HdsFormTextInputField>

                  {{! Email field }}
                  <HdsFormTextInputField
                    @value={{this.emailValue}}
                    @type="email"
                    name="email"
                    {{on "input" this.updateEmail}}
                    as |Field|
                  >
                    <Field.Label>Email Address</Field.Label>
                    <Field.HelperText>
                      We'll never share your email with anyone else.
                    </Field.HelperText>
                    {{#if this.isEmailEmpty}}
                      <Field.Error>Email is required.</Field.Error>
                    {{/if}}
                  </HdsFormTextInputField>
                </F.Section>

                <F.Footer as |FF|>
                  <FF.ButtonSet>
                    <HdsButton
                      @text="Preview & Submit"
                      type="submit"
                      {{on "click" this.openPreviewModal}}
                    />
                    <HdsButton
                      @text="Cancel"
                      @color="secondary"
                      {{on "click" this.cancelForm}}
                    />
                  </FF.ButtonSet>
                </F.Footer>
              </HdsForm>
            </div>

            <div class="helios-demo-app-info-box">
              <p>
                <strong>Components Demonstrated:</strong>
              </p>
              <ul>
                <li><strong>Accordion:</strong> Collapsible help sections</li>
                <li><strong>Form:</strong> Text inputs with validation</li>
                <li>
                  <strong>Modal:</strong>
                  Preview dialog (click "Preview & Submit")
                </li>
              </ul>
            </div>
          </div>
        </Frame.Main>
      </HdsAppFrame>
    </div>

    {{! Modal for form preview - rendered at root level per documentation }}
    {{#if this.isModalOpen}}
      <HdsModal
        id="helios-demo-preview-modal"
        @onClose={{this.closeModal}}
        as |M|
      >
        <M.Header>
          Confirm Your Information
        </M.Header>
        <M.Body>
          <HdsTextBody>
            <p>Please review your information before submitting:</p>
            <div class="helios-demo-app-modal-content">
              <p>
                <strong>Full Name:</strong>
                {{this.nameValue}}
              </p>
              <p>
                <strong>Email Address:</strong>
                {{this.emailValue}}
              </p>
            </div>
            <p class="helios-demo-app-modal-footer-text">
              Click "Confirm & Submit" to complete your submission, or "Go Back"
              to make changes.
            </p>
          </HdsTextBody>
        </M.Body>
        <M.Footer as |MF|>
          <HdsButtonSet>
            <HdsButton
              @text="Confirm & Submit"
              type="button"
              {{on "click" this.confirmSubmit}}
            />
            <HdsButton
              @text="Go Back"
              @color="secondary"
              type="button"
              {{on "click" MF.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}

    <ShwDivider />
  </template>
}
