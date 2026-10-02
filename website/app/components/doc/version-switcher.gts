/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';
import type FastbootService from 'ember-cli-fastboot/services/fastboot';
import type Owner from '@ember/owner';
import { hash } from '@ember/helper';

interface DocVersionSwitcherSignature {
  Args: Record<string, never>;
  Element: HTMLDivElement;
}

interface DocVersion {
  version: string;
  url: string;
}

interface DocVersionsManifest {
  latest: string;
  versions: DocVersion[];
}

const POPOVER_ID = 'doc-version-switcher-popover';
const POPOVER_TITLE_ID = 'doc-version-switcher-title';

// Note: for now we use a static version, later we can understand if/how we can read the value directly from the `@hashicorp/design-system-components` package (dependency)
const CURRENT_VERSION = '6.5.0';

// This format is defined in `.github/workflows/create-vercel-alias.yml`
const ARCHIVED_HOSTNAME_REGEX = /^hds-website-\d+-\d+-\d+\.vercel\.app$/;

const getDocVersions = async (): Promise<DocVersion[]> => {
  // Note: the list of documentation versions lives in a static JSON file (`website/public/doc-versions.json`).
  // Local development + testing and production deployments read their own copy from their public folder.
  // The "archived" versions of the website instead fetch the list from the canonical website so they can show also the versions released *after* them.
  const url = ARCHIVED_HOSTNAME_REGEX.test(window.location.hostname)
    ? // canonical URL
      'https://helios.hashicorp.design/doc-versions.json'
    : // local version
      '/doc-versions.json';

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }

  // notice: the website has a catch-all rewrite (see `website/vercel.json`)
  // that returns the app's HTML shell with a `200` status for any unmatched path,
  // so a missing JSON file doesn't result in a `404` and we have to check the content type to detect it
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Unexpected content-type "${contentType}" — expected JSON`);
  }

  const manifest = (await response.json()) as DocVersionsManifest;

  if (!Array.isArray(manifest?.versions)) {
    throw new Error('Unexpected response content');
  }

  return manifest.versions;
};

export default class DocVersionSwitcher extends Component<DocVersionSwitcherSignature> {
  @service declare readonly fastboot: FastbootService;

  @tracked versions: DocVersion[] = [];

  currentVersion = CURRENT_VERSION;

  constructor(owner: Owner, args: DocVersionSwitcherSignature['Args']) {
    super(owner, args);
    if (!this.fastboot.isFastBoot) {
      void this.loadVersions();
    }
  }

  async loadVersions(): Promise<void> {
    try {
      const versions = await getDocVersions();

      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      this.versions = versions;
    } catch (err) {
      console.warn('Failed to load the list of documentation versions:', err);
    }
  }

  <template>
    {{! the popover is opened/closed by "soft" events (hover and focus) }}
    <HdsPopoverPrimitive @enableSoftEvents={{true}} as |PP|>
      <div
        class="doc-version-switcher"
        {{PP.setupPrimitiveContainer}}
        ...attributes
      >
        <button
          type="button"
          class="doc-version-switcher__toggle"
          aria-label="Change documentation version"
          aria-expanded={{if PP.isOpen "true" "false"}}
          {{PP.setupPrimitiveToggle}}
        >
          v{{this.currentVersion}}
        </button>
        <div
          popover
          id={{POPOVER_ID}}
          class="doc-version-switcher__popover"
          aria-labelledby={{POPOVER_TITLE_ID}}
          {{PP.setupPrimitivePopover
            anchoredPositionOptions=(hash
              placement="bottom-start"
              strategy="fixed"
              offsetOptions=(hash mainAxis=12 crossAxis=-8)
              enableCollisionDetection="shift"
            )
          }}
        >
          <p
            id={{POPOVER_TITLE_ID}}
            class="doc-version-switcher__popover-title"
          >Documentation versions</p>
          <ul role="list" class="doc-version-switcher__popover-list">
            {{#each this.versions as |doc|}}
              <li>
                <a
                  class="doc-version-switcher__popover-version-link"
                  href={{doc.url}}
                >v{{doc.version}}</a>
              </li>
            {{/each}}
          </ul>
          <a
            href="https://helios.hashicorp.design/whats-new/release-notes"
            class="doc-version-switcher__popover-other-versions"
          >
            Other versions
          </a>
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
