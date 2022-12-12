import Component from '@glimmer/component';

const STATUSES = {
  released: {
    badgeType: 'success',
    badgeText: 'Released',
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
