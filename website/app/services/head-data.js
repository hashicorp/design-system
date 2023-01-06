import HeadDataService from 'ember-meta/services/head-data';
import config from 'ember-get-config';

export default class CustomHeadDataService extends HeadDataService {
  get title() {
    return (
      this.currentRouteMeta?.title ??
      this.currentRouteMeta?.frontmatter?.title ??
      config['ember-meta'].title
    );
  }

  get description() {
    return (
      this.currentRouteMeta?.frontmatter?.description ??
      config['ember-meta'].description
    );
  }

  get imgSrc() {
    return this.currentRouteMeta?.id
      ? `/assets/illustrations/${this.currentRouteMeta?.id.replace(
          /\/index$/,
          ''
        )}.jpg`
      : config['ember-meta'].imgSrc;
  }
}
