/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import hdsT from '../../../helpers/hds-t.ts';
import HdsAppFooterItem from './item.gts';
import HdsAppFooterLink from './link.gts';

export interface HdsAppFooterLegalLinksSignature {
  Args: {
    ariaLabel?: string;
    hrefForTerms?: string;
    hrefForPrivacy?: string;
    hrefForSecurity?: string;
    hrefForSupport?: string;
    hrefForAccessibility?: string;
  };
  Element: HTMLUListElement;
}

export default class HdsAppFooterLegalLinks extends Component<HdsAppFooterLegalLinksSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Legal links'
   */
  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'Legal links';
  }

  /**
   * @param hrefForSupport
   * @type {string}
   * @description The href value of the "Support" link
   */
  get hrefForSupport(): string {
    return this.args.hrefForSupport ?? 'https://www.hashicorp.com/support';
  }

  /**
   * @param hrefForTerms
   * @type {string}
   * @description The href value of the "Terms" link
   */
  get hrefForTerms(): string {
    return (
      this.args.hrefForTerms ?? 'https://www.hashicorp.com/terms-of-service'
    );
  }

  /**
   * @param hrefForPrivacy
   * @type {string}
   * @description The href value of the "Privacy" link
   */
  get hrefForPrivacy(): string {
    return this.args.hrefForPrivacy ?? 'https://www.hashicorp.com/privacy';
  }

  /**
   * @param hrefForSecurity
   * @type {string}
   * @description The href value of the "Security" link
   */
  get hrefForSecurity(): string {
    return this.args.hrefForSecurity ?? 'https://www.hashicorp.com/security';
  }

  /**
   * @param hrefForAccessibility
   * @type {string}
   * @description The href value of the "Accessibility" link
   */
  get hrefForAccessibility(): string {
    return (
      this.args.hrefForAccessibility ??
      'https://www.hashicorp.com/accessibility'
    );
  }

  <template>
    <HdsAppFooterItem>
      <ul
        class="hds-app-footer__legal-links"
        aria-label={{this.ariaLabel}}
        ...attributes
      >
        <HdsAppFooterLink @href={{this.hrefForSupport}}>
          {{hdsT
            "hds.components.app-footer.legal-links.support"
            default="Support"
          }}
        </HdsAppFooterLink>
        <HdsAppFooterLink @href={{this.hrefForTerms}}>
          {{hdsT "hds.components.app-footer.legal-links.terms" default="Terms"}}
        </HdsAppFooterLink>
        <HdsAppFooterLink @href={{this.hrefForPrivacy}}>
          {{hdsT
            "hds.components.app-footer.legal-links.privacy"
            default="Privacy"
          }}
        </HdsAppFooterLink>
        <HdsAppFooterLink @href={{this.hrefForSecurity}}>
          {{hdsT
            "hds.components.app-footer.legal-links.security"
            default="Security"
          }}
        </HdsAppFooterLink>
        <HdsAppFooterLink @href={{this.hrefForAccessibility}}>
          {{hdsT
            "hds.components.app-footer.legal-links.accessibility"
            default="Accessibility"
          }}
        </HdsAppFooterLink>
      </ul>
    </HdsAppFooterItem>
  </template>
}
