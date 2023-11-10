import Controller from '@ember/controller';
import showdown from 'showdown';
import { set, action } from '@ember/object';
import { showdownConfig } from '../shared/showdown-config';

export default class ShowController extends Controller {
  queryParams = [
    {
      selectedTab: 'tab',
    },
    // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
    'preserveScrollPosition',
    // these are used for the searches/filters in the website
    'searchQuery',
    'selectedIconSize',
    // these are used in the "pagination > how to use" demos
    'demoCurrentPage',
    'demoCurrentPageSize',
    'demoCurrentCursor',
    'demoExtraParam',
    // these are used in the "tabs > how to use" demos
    'demoSelectedTab',
  ];

  get title() {
    return this.model.frontmatter?.title ?? '';
  }

  get description() {
    return this.model.frontmatter?.description ?? false;
  }

  get extra() {
    let { links } = this.model.frontmatter;
    return { links };
  }

  get relatedComponents() {
    if (this.model.relatedComponents) {
      return this.model.relatedComponents.map((relatedComponent) => ({
        image: `/${relatedComponent.previewImage}`,
        title: relatedComponent?.navigation?.label || relatedComponent.title,
        caption: relatedComponent.caption,
        route: 'show',
        model: relatedComponent.pageURL,
      }));
    } else {
      return false;
    }
  }

  get currentTab() {
    if (!this.selectedTab) {
      return this.tabs[0];
    }
    let tab = this.tabs.find((el) => {
      // for consistency we always compare the query param tab to a lowercase version of the tab label
      return el.lowerLabel === this.selectedTab;
    });

    if (!tab) {
      this.setSelectedQueryTab(null);
      return this.tabs[0];
    }

    return tab;
  }

  setSelectedQueryTab(selected) {
    set(this, 'selectedTab', selected);
  }

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    let contentToConvert = this.currentTab?.content ?? this.model.content;
    return converter.makeHtml(contentToConvert);
  }

  get sidecarContent() {
    let result;
    let sidecar = [];
    const regex = new RegExp(
      /<h([2-5])\s+class="([^"]+)"\s+id="([^"]+)">([^<]+)<\/h\1>/,
      'gm'
    );
    while ((result = regex.exec(this.renderedContent)) !== null) {
      sidecar.push({
        depth: result[1],
        target: result[3],
        text: result[4],
      });
    }

    return sidecar.filter((item) => item.depth <= 3);
  }

  get sidecarId() {
    return this.currentTab?.lowerLabel ?? 'all';
  }

  get tabs() {
    const reg = new RegExp(
      /^<section data-tab="([^>]*)">((.|\n)*?)<\/section>$/,
      'gm'
    );
    let result;
    let tabs = [];
    let tabCount = 0;
    while ((result = reg.exec(this.model.content)) !== null) {
      tabs.push({
        index: tabCount++,
        id: `tab-${result[1].toLowerCase()}`,
        label: result[1],
        lowerLabel: result[1].toLowerCase(),
        content: result[2],
      });
    }
    return tabs;
  }

  setCurrentTab(current) {
    // update the query params if tabs exist and current is defined
    if (this.tabs.length > 1 && current !== null) {
      if (current == 0) {
        // for the first tab we remove the query param
        this.setSelectedQueryTab(null);
      } else {
        // for the rest of the tabs we set the query param tab to a lowercase version of the tab label
        this.setSelectedQueryTab(this.tabs[current].lowerLabel);
      }
    } else {
      // make the first tab current if not defined
      this.setSelectedQueryTab(null);
    }
  }

  @action
  onClickTab(tab) {
    this.setCurrentTab(tab.index);
  }
}
