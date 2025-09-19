/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextBody from 'showcase/components/shw/text/body';

// HDS Components
import { HdsFormSelectField } from '@hashicorp/design-system-components/components';
import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

export interface SubSectionDemoSignature {
  Args: {
    lang?: string;
    onLangChange: (event: Event) => void;
  };
}

const SubSectionDemo: TemplateOnlyComponent<SubSectionDemoSignature> =
  <template>
    <ShwTextH2>Demo</ShwTextH2>
    <ShwTextBody>
      This page demonstrates the use of the
      <code>hds-t</code>
      helper and
      <code>hds-intl</code>
      service for internationalizing text. Selecting a language from the
      dropdown below will set the global locale used by
      <code>ember-intl</code>
      to translate the text on this page. Selecting
      <code>None</code>
      demonstrates the fallback translation, which is used in consuming
      applications that have not yet set up internationalization through
      <code>ember-intl</code>. The locale will be reset back to its initial
      value when leaving the page.
    </ShwTextBody>

    <HdsFormSelectField {{on "change" @onLangChange}} as |F|>
      <F.Label>{{hdsT
          "showcase.pages.internationalization.translation.language"
          default="Language (Fallback translation)"
        }}</F.Label>

      <F.Options>
        <option value="" selected={{eq @lang ""}}>
          {{hdsT
            "showcase.pages.internationalization.translation.language-options.none"
            default="None (Fallback translation)"
          }}
        </option>
        <option value="en-us" selected={{eq @lang "en-us"}}>
          {{hdsT
            "showcase.pages.internationalization.translation.language-options.en"
            default="English (Fallback translation)"
          }}
        </option>
        <option value="es-es" selected={{eq @lang "es-es"}}>
          {{hdsT
            "showcase.pages.internationalization.translation.language-options.es"
            default="Spanish (Fallback translation)"
          }}
        </option>
        <option value="fr-fr" selected={{eq @lang "fr-fr"}}>
          {{hdsT
            "showcase.pages.internationalization.translation.language-options.fr"
            default="French (Fallback translation)"
          }}
        </option>
      </F.Options>
    </HdsFormSelectField>

    <ShwDivider @level={{2}} />
  </template>;

export default SubSectionDemo;
