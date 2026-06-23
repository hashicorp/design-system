/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import DocComponentApiProperty from 'website/components/doc/component-api/property';
import { getDocComponentApiProperties } from 'website/shared/component-api-manifest';

import type {
  DocComponentApiProperty as DocComponentApiPropertyShape,
  DocComponentApiSection,
} from 'website/shared/component-api-manifest';

interface DocComponentApiSignature {
  Args: {
    component?: string;
    section?: DocComponentApiSection;
    name?: string;
    properties?: DocComponentApiPropertyShape[];
  };
  Blocks: {
    default: [
      {
        Property: typeof DocComponentApiProperty;
        properties: DocComponentApiPropertyShape[];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class DocComponentApi extends Component<DocComponentApiSignature> {
  get hasComponent(): boolean {
    return (
      typeof this.args.component === 'string' && this.args.component.length > 0
    );
  }

  get hasRuntimeApiData(): boolean {
    return this.hasComponent || Array.isArray(this.args.properties);
  }

  get apiProperties(): DocComponentApiPropertyShape[] {
    if (Array.isArray(this.args.properties) === true) {
      return this.args.properties;
    }

    const component = this.args.component;

    if (typeof component !== 'string' || component.length === 0) {
      return [];
    }

    return getDocComponentApiProperties(
      component,
      this.args.section ?? 'api',
      this.args.name,
    );
  }

  <template>
    <div class="doc-component-api" ...attributes>
      {{#if this.hasRuntimeApiData}}
        {{#if (has-block)}}
          {{yield
            (hash
              Property=DocComponentApiProperty properties=this.apiProperties
            )
          }}
        {{else}}
          {{#each this.apiProperties as |property|}}
            <DocComponentApiProperty
              @name={{property.name}}
              @type={{property.type}}
              @required={{property.required}}
              @values={{property.values}}
              @default={{property.default}}
              @valueNote={{property.valueNote}}
              @description={{property.description}}
              @remarks={{property.remarks}}
              @links={{property.links}}
            >
              {{#if property.properties}}
                <div class="doc-component-api">
                  {{#each property.properties as |nestedProperty|}}
                    <DocComponentApiProperty
                      @name={{nestedProperty.name}}
                      @type={{nestedProperty.type}}
                      @required={{nestedProperty.required}}
                      @values={{nestedProperty.values}}
                      @default={{nestedProperty.default}}
                      @valueNote={{nestedProperty.valueNote}}
                      @description={{nestedProperty.description}}
                      @remarks={{nestedProperty.remarks}}
                      @links={{nestedProperty.links}}
                    />
                  {{/each}}
                </div>
              {{/if}}
            </DocComponentApiProperty>
          {{/each}}
        {{/if}}
      {{else}}
        {{yield (hash Property=DocComponentApiProperty)}}
      {{/if}}
    </div>
  </template>
}
