import Controller from '@ember/controller';
import showdown from 'showdown';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { showdownConfig } from '../shared/showdown-config';

const getTOCs = (container) => {
  let headings = [];
  container.querySelectorAll(`:scope > h2, :scope > h3`).forEach((element) => {
    // we need to add a class to avoid the element being hidden behind the fixed top header
    element.classList.add('doc-page-sidecar-scroll-margin-top');
    // we add it to the list of headings used as TOC in the sidecar
    headings.push({
      target: element.id,
      text: element.innerText,
      depth: element.tagName.replace(/h/i, ''),
    });
  });
  return headings;
};

export default class ShowController extends Controller {
  queryParams = [
    {
      selectedTab: 'tab',
    },
    'searchQuery',
    'selectedIconSize',
  ];

  @service fastboot;

  @tracked sections = A([]);
  @tracked tabs = A([]);
  @tracked tocs = A([]);

  get selectedTabIndex() {
    // if no query param is set then default to the first tab
    if (!this.selectedTab) {
      return 0;
    }

    let tab = this.tabs.find((el) => {
      // for consistency we always compare the query param tab to a lowercase version of the tab label
      return el.label.toLowerCase() === this.selectedTab;
    });
    return tab ? tab.index : 0;
  }

  get title() {
    return this.model.frontmatter?.title ?? '';
  }

  get description() {
    return this.model.frontmatter?.description ?? false;
  }

  get extra() {
    let { status, links } = this.model.frontmatter;
    return { status, links };
  }

  get renderedContent() {
    // schedule tabs logic for after this content is rendered
    if (!this.fastboot.isFastBoot) {
      schedule('afterRender', () => {
        this.didInsertContent();
      });
    }
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }

  didInsertContent = () => {
    let sections = [];
    let tabs = [];
    let tocs = [];

    // check if the content is split in sections (and we need tabs) or is all together
    const documentSections = document.querySelectorAll(
      `.doc-page-content section[data-tab]`
    );

    if (documentSections.length > 0) {
      documentSections.forEach((section, index) => {
        // SECTIONS
        const id = section.id;
        const name = section.getAttribute('data-tab');
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('tabindex', '0');
        section.setAttribute('aria-labelledby', `tab-${id}`);
        section.setAttribute('hidden', true);
        sections.push(section);
        // TABS
        tabs.push({
          index,
          id: `tab-${id}`,
          label: name,
          target: section.id,
          onClickTab: this.onClickTab,
          isCurrent: false,
        });
        tocs.push({
          index,
          id: `toc-${name}`,
          list: getTOCs(section),
        });
      });
    } else {
      const container = document.querySelector('.doc-page-content');
      tocs.push({
        index: 0,
        id: 'toc-all',
        list: getTOCs(container),
      });
    }

    this.sections.setObjects(sections);
    this.tabs.setObjects(tabs);
    this.tocs.setObjects(tocs);
    this.setCurrent(this.selectedTabIndex);
    // leave for debugging
    // console.log('show didInsert', this.sections, this.tabs, this.tocs);
  };

  @action
  onClickTab(tab) {
    // console.log('show onClickTab', tab);
    this.setCurrent(tab.index);
  }

  @action
  setCurrent(current) {
    // TABS
    this.tabs.forEach((tab) => {
      set(tab, 'isCurrent', tab.index === current);
    });
    // SECTIONS
    this.sections.forEach((section, index) => {
      if (index === current) {
        section.removeAttribute('hidden');
      } else {
        section.setAttribute('hidden', true);
      }
    });
    // TOCS
    this.tocs.forEach((toc) => {
      set(toc, 'isCurrent', toc.index === current);
    });

    // only attempt to update the query params if tabs exist
    if (this.tabs.length > 1) {
      // for consistency we always set the query param tab to a lowercase version of the tab label
      set(this, 'selectedTab', this.tabs[current].label.toLowerCase());
    } else {
      set(this, 'selectedTab', null);
    }

    // leave for debugging
    // console.log('show setCurrent', this.sections, this.tabs, this.tocs);
  }
}
