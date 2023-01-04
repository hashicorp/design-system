import HeadDataService from 'ember-meta/services/head-data';

export default class CustomHeadDataService extends HeadDataService {
  // this is needed or `head-data.js` will crush
  get config() {
    return {};
  }

  get title() {
    return (
      this.currentRouteMeta?.title ??
      this.currentRouteMeta?.frontmatter?.title ??
      'Helios Design System'
    );
  }

  get siteName() {
    return 'Helios Design System';
  }

  get description() {
    return this.currentRouteMeta?.frontmatter?.description ?? null;
  }
}
