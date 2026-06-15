/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { not } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

export default class SubSectionCarbonDemoApp extends Component {
  @tracked nameValue = '';
  @tracked emailValue = '';
  @tracked showFormErrors = false;
  @tracked isModalOpen = false;

  @action
  updateName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.nameValue = target.value;
    if (this.showFormErrors) {
      this.showFormErrors = false;
    }
  }

  @action
  updateEmail(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.emailValue = target.value;
    if (this.showFormErrors) {
      this.showFormErrors = false;
    }
  }

  @action
  openPreviewModal(): void {
    if (!this.nameValue || !this.emailValue) {
      this.showFormErrors = true;
      return;
    }
    this.isModalOpen = true;
  }

  @action
  closeModal(): void {
    this.isModalOpen = false;
  }

  @action
  confirmSubmit(): void {
    alert(`Form submitted!\nName: ${this.nameValue}\nEmail: ${this.emailValue}`);
    this.nameValue = '';
    this.emailValue = '';
    this.isModalOpen = false;
    this.showFormErrors = false;
  }

  @action
  cancelForm(): void {
    if (confirm('Are you sure you want to cancel? All data will be lost.')) {
      this.nameValue = '';
      this.emailValue = '';
      this.showFormErrors = false;
    }
  }

  <template>
    <ShwTextH2>Carbon Design System Demo</ShwTextH2>

    <ShwTextBody>
      A full application layout using Carbon Design System components, mirroring the Helios demo structure.
    </ShwTextBody>

    {{! Apply Carbon white theme to the entire demo }}
    <div class="cds-theme-zone-white carbon-demo-app"> {{!-- Ask Lee to explain. --}}

      {{! Carbon UI Shell - Header }}
      <cds-header aria-label="Carbon Demo App">
        <cds-header-name href="#" prefix="IBM">Carbon Demo</cds-header-name>

        <cds-header-nav>
          <cds-header-nav-item href="#">Dashboard</cds-header-nav-item>
          <cds-header-nav-item href="#">Services</cds-header-nav-item>
          <cds-header-nav-item href="#">Organization</cds-header-nav-item>
        </cds-header-nav>

        <cds-header-menu-button button-label-active="Close menu" button-label-inactive="Open menu">
        </cds-header-menu-button>
      </cds-header>

      {{! Carbon Side Navigation }}
      <cds-side-nav aria-label="Side navigation" collapse-mode="rail">
        <cds-side-nav-items>
          <cds-side-nav-link href="#">Dashboard</cds-side-nav-link>
          <cds-side-nav-link href="#">Services</cds-side-nav-link>
          <cds-side-nav-menu title="Organization">
            <cds-side-nav-menu-item href="#">Settings</cds-side-nav-menu-item>
            <cds-side-nav-menu-item href="#">Members</cds-side-nav-menu-item>
            <cds-side-nav-menu-item href="#">Billing</cds-side-nav-menu-item>
          </cds-side-nav-menu>
        </cds-side-nav-items>
      </cds-side-nav>

      {{! Main Content Area }}
      <div class="carbon-demo-app__main-content">

        {{! User Information Form }}
        <div class="carbon-demo-app__section">
          <h3 class="carbon-demo-app__section-title">User Information Form</h3>
          <p class="carbon-demo-app__section-description">Please fill out your information below.</p>

          <cds-form>
            {{! Full Name Input }}
            <div class="carbon-demo-app__form-field">
              <cds-text-input
                label="Full Name"
                placeholder="Enter your full name"
                helper-text="Your first and last name"
                value={{this.nameValue}}
                {{on "input" this.updateName}}
                invalid={{if this.showFormErrors (not this.nameValue) false}}
                invalid-text={{if this.showFormErrors "Full name is required" ""}}
              >
              </cds-text-input>
            </div>

            {{! Email Input }}
            <div class="carbon-demo-app__form-field">
              <cds-text-input
                label="Email Address"
                placeholder="your.email@example.com"
                helper-text="We'll never share your email"
                value={{this.emailValue}}
                {{on "input" this.updateEmail}}
                invalid={{if this.showFormErrors (not this.emailValue) false}}
                invalid-text={{if this.showFormErrors "Email address is required" ""}}
              >
              </cds-text-input>
            </div>

            {{! Form Actions }}
            <div class="carbon-demo-app__form-actions">
              {{! template-lint-disable no-invalid-interactive }}
              <cds-button {{on "click" this.openPreviewModal}}>
                Preview & Submit
              </cds-button>
              <cds-button kind="secondary" {{on "click" this.cancelForm}}>
                Cancel
              </cds-button>
              {{! template-lint-enable no-invalid-interactive }}
            </div>
          </cds-form>
        </div>

        {{! Help Documentation Accordion }}
        <div class="carbon-demo-app__section">
          <h3 class="carbon-demo-app__section-title">Help & Documentation</h3>

          <cds-accordion>
            <cds-accordion-item title="How to fill out this form" open>
              <p>This form collects basic user information. Please ensure all required fields are completed before submitting.</p>
              <ul class="carbon-demo-app__accordion-list">
                <li>Full Name: Enter your complete legal name</li>
                <li>Email: Provide a valid email address for communication</li>
              </ul>
            </cds-accordion-item>

            <cds-accordion-item title="Privacy & Data Usage">
              <p>Your information is protected and will only be used for the purposes stated in our privacy policy.</p>
              <p class="carbon-demo-app__accordion-paragraph">We implement industry-standard security measures to protect your data.</p>
            </cds-accordion-item>

            <cds-accordion-item title="Frequently Asked Questions">
              <p><strong>Q: How long does processing take?</strong></p>
              <p>A: Typically 1-2 business days.</p>
              <p class="carbon-demo-app__accordion-paragraph"><strong>Q: Can I edit my information later?</strong></p>
              <p>A: Yes, you can update your profile at any time.</p>
            </cds-accordion-item>
          </cds-accordion>
        </div>

      </div>

      {{! Modal for Form Preview }}
      {{#if this.isModalOpen}}
        <cds-modal open size="sm" {{on "cds-modal-closed" this.closeModal}}>
          <cds-modal-header>
            <cds-modal-heading>Review Your Information</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <p class="carbon-demo-app__modal-description">Please review your information before submitting:</p>
            <div class="carbon-demo-app__modal-preview">
              <p class="carbon-demo-app__modal-preview-item"><strong>Full Name:</strong> {{this.nameValue}}</p>
              <p class="carbon-demo-app__modal-preview-item"><strong>Email:</strong> {{this.emailValue}}</p>
            </div>
          </cds-modal-body>
          <cds-modal-footer>
            {{! template-lint-disable no-invalid-interactive }}
            <cds-button kind="secondary" {{on "click" this.closeModal}}>
              Go Back
            </cds-button>
            <cds-button {{on "click" this.confirmSubmit}}>
              Confirm & Submit
            </cds-button>
            {{! template-lint-enable no-invalid-interactive }}
          </cds-modal-footer>
        </cds-modal>
      {{/if}}

    </div>

    <ShwDivider />
  </template>
}
