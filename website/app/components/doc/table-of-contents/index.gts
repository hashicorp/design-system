/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { eq } from 'ember-truth-helpers';
import { hash } from '@ember/helper';
import { add } from 'ember-math-helpers';
import { humanize } from 'ember-cli-string-helpers';

import DocBadge from 'website/components/doc/badge';
import DocTableOfContentsCollapsibleItem from 'website/components/doc/table-of-contents/collapsible-item';

interface TocTreeItem {
  filePath: string;
  pageName: string;
  pageParents: string[];
  pageURL: string;
  pageAttributes: {
    title: string;
    status: {
      deprecated?: string;
      updated?: string;
      added?: string;
    };
    navigation: {
      order?: number;
      hidden?: boolean;
      label?: string;
      keywords?: string[];
    };
  };
}

export interface TocTree {
  [key: string]: TocTreeItem | TocTree;
}

interface DocTableOfContentsSignature {
  Args: {
    structuredPageTree: TocTree;
    depth: number;
  };
  Element: HTMLUListElement;
}

const DocTableOfContents: TemplateOnlyComponent<DocTableOfContentsSignature> =
  <template>
    <ul class="doc-table-of-contents" role="list" ...attributes>
      {{#each-in @structuredPageTree as |key item|}}
        <li
          class="doc-table-of-contents__item doc-table-of-contents__item--depth-{{@depth}}"
        >
          {{#if item.pageURL}}
            <LinkTo
              class="doc-table-of-contents__link"
              @route="show"
              @model={{item.pageURL}}
              @query={{hash
                tab=null
                searchQuery=null
                selectedGroupType=null
                selectedIconSize=null
              }}
              @current-when={{"show"}}
            >
              {{#if item.pageAttributes.navigation.label}}
                {{item.pageAttributes.navigation.label}}
              {{else}}
                {{item.pageAttributes.title}}
              {{/if}}
              {{#if item.pageAttributes.status.deprecated}}
                <DocBadge
                  @type="warning-inverted"
                  @size="medium"
                >Deprecated</DocBadge>
              {{else if item.pageAttributes.status.updated}}
                <DocBadge
                  @type="neutral-inverted"
                  @size="medium"
                >Updated</DocBadge>
              {{else if item.pageAttributes.status.added}}
                <DocBadge
                  @type="information-inverted"
                  @size="medium"
                >Added</DocBadge>
              {{/if}}
            </LinkTo>
          {{else}}
            {{#if (eq @depth 1)}}
              <div class="doc-table-of-contents__heading">{{humanize key}}</div>
              <DocTableOfContents
                @structuredPageTree={{item}}
                @depth={{add @depth 1}}
              />
            {{else}}
              <DocTableOfContentsCollapsibleItem
                @item={{item}}
                @depth={{add @depth 1}}
                @name={{humanize key}}
              />
            {{/if}}
          {{/if}}
        </li>
      {{/each-in}}
    </ul>
  </template>;

export default DocTableOfContents;
