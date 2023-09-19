/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFooterIndexComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The href value of the "Support" link
   */
  get urlForSupport() {
    return this.args.urlForSupport ?? 'https://www.hashicorp.com/support';
  }

  /**
   * @param urlForTerms
   * @type {string}
   * @description The href value of the "Terms" link
   */
  get urlForTerms() {
    return (
      this.args.urlForTerms ??
      'https://portal.cloud.hashicorp.com/terms-of-service'
    );
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @description The href value of the "Privacy" link
   */
  get urlForPrivacy() {
    return this.args.urlForPrivacy ?? 'https://www.hashicorp.com/privacy';
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @description The href value of the "Security" link
   */
  get urlForSecurity() {
    return this.args.urlForSecurity ?? 'https://www.hashicorp.com/security';
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @description The href value of the "Accessibility" link
   */
  get urlForAccessibility() {
    return (
      this.args.urlForAccessibility ?? 'mailto:accessibility@hashicorp.com'
    );
  }
}
