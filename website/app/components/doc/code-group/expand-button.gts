/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { service } from '@ember/service';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import EventTrackingService from 'website/services/event-tracking';

interface DocCodeGroupExpandButtonSignature {
  Args: {
    isExpanded: boolean;
    onToggleExpand: () => void;
    filename?: string;
  };
  Element: HTMLButtonElement;
}

export default class DocCodeGroupExpandButton extends Component<DocCodeGroupExpandButtonSignature> {
  @service declare readonly eventTracking: EventTrackingService;

  get icon() {
    return this.args.isExpanded ? 'unfold-close' : 'unfold-open';
  }

  onClick = () => {
    const { filename, onToggleExpand, isExpanded } = this.args;

    onToggleExpand();

    this.eventTracking.trackEvent(
      `Demo - ${filename} - Expand Button - ${isExpanded}`,
    );
  };

  <template>
    <button
      type="button"
      class="doc-code-group__expand-button"
      {{on "click" this.onClick}}
      aria-expanded={{if @isExpanded "true" "false"}}
      aria-label="Expand .gts snippet"
      ...attributes
    >
      <HdsIcon @name={{this.icon}} />
    </button>
  </template>
}
