import Component from '@glimmer/component';

const STATUSES = {
  'on-roadmap': {
    badgeType: 'neutral',
    badgeText: 'On roadmap',
  },
  released: {
    badgeType: 'success',
    badgeText: 'Released',
  },
  experimental: {
    badgeType: 'warning',
    badgeText: 'Experimental',
  },
  'code-only': {
    badgeType: 'information',
    badgeText: 'Code only',
  },
  'design-only': {
    badgeType: 'information',
    badgeText: 'Design only',
  },
  deprecated: {
    badgeType: 'critical',
    badgeText: 'Deprecated',
  },
};

export default class DocPageContentComponent extends Component {
  get status() {
    let { extra } = this.args;

    if (extra?.status) {
      if (extra.status in STATUSES) {
        return STATUSES[extra.status];
      } else {
        console.error(
          `Error: you have provided an unexpected status for the page cover element (${
            extra.status
          }) - Possible values: "${Object.keys(STATUSES).join('", "')}".`
        );
        return false;
      }
    } else {
      return false;
    }
  }

  get links() {
    let { extra } = this.args;

    if (extra?.links) {
      return extra?.links;
    } else {
      return false;
    }
  }
}
