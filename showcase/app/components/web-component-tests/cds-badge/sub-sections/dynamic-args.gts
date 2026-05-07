import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsCdsBadge,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import { CDS_BADGE_TYPE_OPTIONS } from '@hashicorp/design-system-components/components/hds/cds-badge/index';
import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

export default class SubSectionWithDynamicArgs extends Component {
  @tracked type = CDS_BADGE_TYPE_OPTIONS[0];

  handleClick = () => {
    const currentIndex = this.type
      ? CDS_BADGE_TYPE_OPTIONS.indexOf(this.type)
      : 0;
    const nextIndex = (currentIndex + 1) % CDS_BADGE_TYPE_OPTIONS.length;
    this.type = CDS_BADGE_TYPE_OPTIONS[nextIndex];
  };

  <template>
    <ShwTextH2>Dynamic Examples</ShwTextH2>

    <ShwTextH3>Change badge type on click</ShwTextH3>
    <div>
      <button type="button" {{on "click" this.handleClick}}>Change badge type</button>
    </div>

    <HdsCdsBadge @type={{this.type}}>
      <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
      Lorem ipsum
    </HdsCdsBadge>

    <ShwTextH3>Translation with hdsT helper</ShwTextH3>

    <HdsCdsBadge>
      {{hdsT
        "showcase.pages.web-component-tests.badge-text"
        default="In English"
      }}
    </HdsCdsBadge>
  </template>
}
