/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import hdsT from '../../../helpers/hds-t.ts';
import HdsAppFooterItem from './item.gts';
import HdsAppFooterLink from './link.gts';

import type HdsIntlService from '../../../services/hds-intl.ts';

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
  @service declare readonly hdsIntl: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.app-footer.legal-links.aria-label', {
        default: 'Legal links',
      })
    );
  }

  get hrefForSupport(): string {
    return this.args.hrefForSupport ?? 'https://www.hashicorp.com/support';
  }

  get hrefForTerms(): string {
    return (
      this.args.hrefForTerms ?? 'https://www.hashicorp.com/terms-of-service'
    );
  }

  get hrefForPrivacy(): string {
    return this.args.hrefForPrivacy ?? 'https://www.hashicorp.com/privacy';
  }

  get hrefForSecurity(): string {
    return this.args.hrefForSecurity ?? 'https://www.hashicorp.com/security';
  }

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
