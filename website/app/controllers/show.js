import Controller from '@ember/controller';
import showdown from 'showdown';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { showdownConfig } from '../shared/showdown-config';

const getAnchoredHeadings = (container) => {
  let headings = [];
  container
    .querySelectorAll(`:scope > h2, :scope > h3, :scope > h4, :scope > h5`)
    .forEach((element) => {
      // we add an anchor link to the heading
      if (
        element.id &&
        // notice: we use the class name as a way to detect if the anchor is already been added
        // reason: `didInsertContent` is run at each tab click (something we probably want to look into in a separate ticket)
        !element.classList.contains('doc-page-heading-scroll-margin-top')
      ) {
        const anchor = document.createElement('a');
        anchor.href = `#${element.id}`;
        anchor.className = 'doc-page-heading-link';
        anchor.setAttribute('aria-label', element.innerText);
        element.prepend(anchor);
      }
      // we need to add a class to avoid the element being hidden behind the fixed top header
      element.classList.add('doc-page-heading-scroll-margin-top');
      // we add it to the list of headings (a subset will be used as TOC in the sidecar)
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
    // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
    'preserveScrollPosition',
    // these are used for the searches/filters in the website
    'searchQuery',
    'selectedGroupType',
    'selectedIconSize',
    // these are used in the "pagination > how to use" demos
    'demoCurrentPage',
    'demoCurrentPageSize',
    'demoCurrentCursor',
    'demoExtraParam',
    // these are used in the "tabs > how to use" demos
    'demoSelectedTab',
  ];

  @service fastboot;

  @tracked sections = A([]);
  @tracked tabs = A([]);
  @tracked tocs = A([]);

  get selectedTabIndex() {
    // if no query param is set then we mark it as null
    if (!this.selectedTab) {
      return null;
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

  get status() {
    if (this.model.frontmatter?.status) {
      let type;
      let version;
      let label;
      if (this.model.frontmatter?.status?.deprecated) {
        type = 'warning';
        label = 'Deprecated';
        version = this.model.frontmatter?.status?.deprecated;
      } else if (this.model.frontmatter?.status?.updated) {
        type = 'neutral';
        label = 'Updated';
        version = this.model.frontmatter?.status?.updated;
      }
      if (version.match(/^\d+\.\d+\.\d+$/)) {
        label += ` in v${version}`;
      }
      return { type, label };
    } else {
      return false;
    }
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

  get currentActiveTabIndex() {
    const tab = this.tabs.find((tab) => {
      return tab.isCurrent;
    });
    return tab.index;
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
          // we show only the headings level 2 and 3 in the sidecar
          list: getAnchoredHeadings(section).filter((item) => item.depth <= 3),
        });
      });
    } else {
      const container = document.querySelector('.doc-page-content');
      tocs.push({
        index: 0,
        id: 'toc-all',
        // we show only the headings level 2 and 3 in the sidecar
        list: getAnchoredHeadings(container).filter((item) => item.depth <= 3),
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
    // update the query params if tabs exist and current is defined
    if (this.tabs.length > 1 && current !== null) {
      if (current == 0) {
        // for the first tab we remove the query param
        set(this, 'selectedTab', null);
      } else {
        // for the rest of the tabs we set the query param tab to a lowercase version of the tab label
        set(this, 'selectedTab', this.tabs[current].label.toLowerCase());
      }
    } else {
      // make the first tab current if not defined
      current = 0;
    }

    // TABS
    // ?? CAN WE EXPLICITLY SET FOCUS ON THE TAB WHEN IT IS SET TO CURRENT?
    this.tabs.forEach((tab) => {
      set(tab, 'isCurrent', tab.index === current);
    });
    // SECTIONS (AKA TABPANELS )
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

    // leave for debugging
    // console.log('show setCurrent', this.sections, this.tabs, this.tocs);
  }
}
