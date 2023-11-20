/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFooterLegalLinksComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Legal links'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Legal links';
  }

  /**
   * @param hrefForSupport
   * @type {string}
   * @description The href value of the "Support" link
   */
  get hrefForSupport() {
    return this.args.hrefForSupport ?? 'https://www.hashicorp.com/support';
  }

  /**
   * @param hrefForTerms
   * @type {string}
   * @description The href value of the "Terms" link
   */
  get hrefForTerms() {
    return (
      this.args.hrefForTerms ?? 'https://www.hashicorp.com/terms-of-service'
    );
  }

  /**
   * @param hrefForPrivacy
   * @type {string}
   * @description The href value of the "Privacy" link
   */
  get hrefForPrivacy() {
    return this.args.hrefForPrivacy ?? 'https://www.hashicorp.com/privacy';
  }

  /**
   * @param hrefForSecurity
   * @type {string}
   * @description The href value of the "Security" link
   */
  get hrefForSecurity() {
    return this.args.hrefForSecurity ?? 'https://www.hashicorp.com/security';
  }

  /**
   * @param hrefForAccessibility
   * @type {string}
   * @description The href value of the "Accessibility" link
   */
  get hrefForAccessibility() {
    return (
      this.args.hrefForAccessibility ??
      'https://www.hashicorp.com/accessibility'
    );
  }
}
