/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { eq, or } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';

import MockApp from 'showcase/components/mock/app';
import MockAppMainGenericFormPartialsAddUser from 'showcase/components/mock/app/main/generic-form/partials/add-user';
import MockAppMainGenericFormPartialsAddPolicy from 'showcase/components/mock/app/main/generic-form/partials/add-policy';
import MockAppMainGenericFormPartialsActions from 'showcase/components/mock/app/main/generic-form/partials/actions';

import ShwFlex from 'showcase/components/shw/flex';
import ShwLabel from 'showcase/components/shw/label';

import {
  HdsForm,
  HdsFormSeparator,
} from '@hashicorp/design-system-components/components';

const CUSTOM_WIDTH_OPTIONS = {
  mixed: 'fullwidth / mixed',
  fullwidth: 'fullwidth / all',
  form: 'custom width / form',
  'header+section': 'custom width / header+section',
  section: 'custom width / section',
  // TODO!
  // 'field': 'custom width / field',
};

export default class PageComponentsFormFramelessDemoFormComplex extends Component {
  @tracked showHighlight = false;
  @tracked customWidthMode = 'mixed';
  customWidthOptions = CUSTOM_WIDTH_OPTIONS;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  setCustomWidthMode = (event: Event) => {
    const { value } = event.target as HTMLSelectElement;
    this.customWidthMode = value;
  };

  <template>
    {{pageTitle "Complex Form Layout - Frameless"}}

    <MockApp>
      <:main>

        <ShwFlex
          class="shw-component-form-layout-frameless-demo-complex-top-toolbar"
          as |SF|
        >
          <SF.Item>
            <button
              type="button"
              class="shw-component-form-layout-button-highlight"
              {{on "click" this.toggleHighlight}}
            >
              {{if
                this.showHighlight
                "Hide layout highlight"
                "Show layout highlight"
              }}
            </button>
          </SF.Item>
          <SF.Item>
            <label>
              👉 Choose custom width applied to the form elements:
              <select {{on "change" this.setCustomWidthMode}}>
                {{#each-in
                  this.customWidthOptions
                  as |customWidthOptionValue customWidthOptionText|
                }}
                  <option
                    value={{customWidthOptionValue}}
                  >{{customWidthOptionText}}</option>
                {{/each-in}}
              </select>
            </label>
          </SF.Item>
        </ShwFlex>

        <ShwLabel>
          {{#if (eq this.customWidthMode "mixed")}}
            Some content is full width
          {{else if (eq this.customWidthMode "fullwidth")}}
            All content is full width
          {{else if (eq this.customWidthMode "form")}}
            Custom width set via local CSS class at form level
          {{else if (eq this.customWidthMode "header+section")}}
            Custom width set via local CSS class only at section level (not at
            header/separator)
          {{else if (eq this.customWidthMode "section")}}
            Custom width set via local CSS class only at section level (not at
            header/separator)
          {{/if}}
          [excluded: RadioCard]
        </ShwLabel>

        <HdsForm
          class="{{if
              this.showHighlight
              'shw-component-form-layout-highlight-elements'
            }}
            {{if
              (eq this.customWidthMode 'form')
              'shw-component-form-layout-custom-max-width'
            }}"
        >

          <MockAppMainGenericFormPartialsAddUser
            @isHeaderFullWidth={{(if
              (or
                (eq this.customWidthMode "mixed")
                (eq this.customWidthMode "fullwidth")
              )
              true
            )}}
            @isSectionFullWidth={{(if
              (eq this.customWidthMode "fullwidth") true
            )}}
            @extraHeaderClass={{if
              (eq this.customWidthMode "header+section")
              "shw-component-form-layout-custom-max-width"
            }}
            @extraSectionClass={{if
              (or
                (eq this.customWidthMode "header+section")
                (eq this.customWidthMode "section")
                (eq this.customWidthMode "section+field")
              )
              "shw-component-form-layout-custom-max-width"
            }}
          />

          <HdsFormSeparator
            @isFullWidth={{(if (eq this.customWidthMode "fullwidth") true)}}
          />

          <MockAppMainGenericFormPartialsAddPolicy
            @isHeaderFullWidth={{(if
              (eq this.customWidthMode "fullwidth") true
            )}}
            @isSectionFullWidth={{(if
              (eq this.customWidthMode "fullwidth") true
            )}}
            @extraHeaderClass={{if
              (eq this.customWidthMode "header+section")
              "shw-component-form-layout-custom-max-width"
            }}
            @extraSectionClass={{if
              (or
                (eq this.customWidthMode "header+section")
                (eq this.customWidthMode "section")
                (eq this.customWidthMode "section+field")
              )
              "shw-component-form-layout-custom-max-width"
            }}
          />

          <MockAppMainGenericFormPartialsActions
            @extraText="Only visible to users with permission to create and manage policies at organization or project level."
          />
        </HdsForm>

      </:main>
    </MockApp>
  </template>
}
