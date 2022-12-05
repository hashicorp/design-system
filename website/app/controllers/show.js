import Controller from '@ember/controller';
import showdown from 'showdown';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { A } from '@ember/array';

import { showdownConfig } from '../shared/showdown-config';

export default class ShowController extends Controller {
  @service('dynamic-sections') dynamicSections;

  @tracked sections = A([]);
  @tracked tabs = A([]);

  get title() {
    // TODO! do something smarter than this :)
    // TODO! also it flashes when the page load!!!!
    return this.model.frontmatter?.title ?? 'This is the (missing) page title';
  }

  get description() {
    // TODO! do something smarter than this :)
    // TODO! also it flashes when the page load!!!!
    return this.model.frontmatter?.description ?? false;
  }

  get renderedContent() {
    const converter = new showdown.Converter(showdownConfig);
    return converter.makeHtml(this.model.content);
  }

  @action
  didInsert(docPageContentElement) {
    let sections = [];
    let tabs = [];
    docPageContentElement
      .querySelectorAll(`section[id^=section-]`)
      .forEach((section, index) => {
        const element = section;
        const name = section.id.replace(/^section-/, '');
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('tabindex', '0');
        section.setAttribute('aria-labelledby', `tab-${name}`);
        section.setAttribute('hidden', true);
        sections.push(element);
        tabs.push({
          index,
          id: `tab-${name}`,
          label: name,
          target: section.id,
          onClickTab: this.onClickTab,
          isCurrent: false,
        });
      });
    this.dynamicSections.updateSections(this.sections);
    this.sections.setObjects(sections);
    this.tabs.setObjects(tabs);
    console.log('show didInsert', this.sections, this.tabs);
    // TODO handle when the page loads which one is the current, based on the URL query params
    this.setCurrent(0);
  }

  @action
  onClickTab(tab) {
    console.log('show onClickTab', tab);
    this.setCurrent(tab.index);
  }

  @action
  setCurrent(current) {
    // set current tab
    this.tabs.forEach((tab) => {
      set(tab, 'isCurrent', tab.index === current);
    });
    // set current section
    this.sections.forEach((section, index) => {
      if (index === current) {
        section.removeAttribute('hidden');
      } else {
        section.setAttribute('hidden', true);
      }
    });
  }
}
