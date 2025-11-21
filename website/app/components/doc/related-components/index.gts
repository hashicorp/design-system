/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { concat } from '@ember/helper';

import DocCardsDeck from 'website/components/doc/cards/deck';
import DocCardsCard from 'website/components/doc/cards/card';
import docTrackEvent from 'website/modifiers/doc-track-event';

interface DocRelatedComponentsSignature {
  Args: {
    componentTitle: string;
    cards: Array<{
      image?: string;
      title: string;
      caption?: string;
      route?: string;
      model?: unknown;
      href?: string;
    }>;
  };
}

const DocRelatedComponents: TemplateOnlyComponent<DocRelatedComponentsSignature> =
  <template>
    <hr class="doc-markdown-hr" />

    <h2 class="doc-text-h2">Related</h2>

    {{! @glint-expect-error - component not typed yet }}
    <DocCardsDeck @cols="2">
      {{#each @cards as |card|}}
        <DocCardsCard
          @image={{card.image}}
          @title={{card.title}}
          @caption={{card.caption}}
          @route={{card.route}}
          @model={{card.model}}
          @href={{card.href}}
          @layout="horizontal"
          {{! @glint-expect-error - modifier not typed yet }}
          {{docTrackEvent
            eventName=(concat "Related - " @componentTitle " - " card.title)
          }}
        />
      {{/each}}
    </DocCardsDeck>
  </template>;

export default DocRelatedComponents;
