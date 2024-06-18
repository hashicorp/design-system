import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AppFooter::Item>\n  <ul class=\"hds-app-footer__legal-links\" aria-label={{this.ariaLabel}} ...attributes>\n    <Hds::AppFooter::Link @href={{this.hrefForSupport}}>Support</Hds::AppFooter::Link>\n    <Hds::AppFooter::Link @href={{this.hrefForTerms}}>Terms</Hds::AppFooter::Link>\n    <Hds::AppFooter::Link @href={{this.hrefForPrivacy}}>Privacy</Hds::AppFooter::Link>\n    <Hds::AppFooter::Link @href={{this.hrefForSecurity}}>Security</Hds::AppFooter::Link>\n    <Hds::AppFooter::Link @href={{this.hrefForAccessibility}}>Accessibility</Hds::AppFooter::Link>\n  </ul>\n</Hds::AppFooter::Item>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFooterLegalLinksComponent extends Component {
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
    return this.args.hrefForTerms ?? 'https://www.hashicorp.com/terms-of-service';
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
    return this.args.hrefForAccessibility ?? 'https://www.hashicorp.com/accessibility';
  }
}
setComponentTemplate(TEMPLATE, HdsAppFooterLegalLinksComponent);

export { HdsAppFooterLegalLinksComponent as default };
//# sourceMappingURL=legal-links.js.map
