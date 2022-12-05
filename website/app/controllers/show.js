import Controller from '@ember/controller';
import showdown from 'showdown';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import { showdownConfig } from '../shared/showdown-config';

export default class ShowController extends Controller {
  @service('dynamic-sections') dynamicSections;

  @tracked sections = [];
  @tracked tabs = [];
  @tracked tabs2 = [
    {
      element: {},
      name: 'guidelines',
      toc: [],
    },
    {
      element: {},
      name: 'code',
      toc: [],
    },
    {
      element: {},
      name: 'specifications',
      toc: [],
    },
    {
      element: {},
      name: 'accessibility',
      toc: [],
    },
  ];

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
    docPageContentElement
      .querySelectorAll(`section[id^=section-]`)
      .forEach((section) => {
        this.sections.push({
          element: section,
          name: section.id.replace(/^section-/, ''),
          toc: [],
        });
        this.tabs.push({
          element: section,
          name: section.id.replace(/^section-/, ''),
          toc: [],
        });
      });
    this.dynamicSections.updateSections(this.sections);

    // if (actions.length) {
    //   this.role = 'alertdialog';
    // }

    // // `alertdialog` must have an accessible name so we use either the
    // // title or the description as label for the alert
    // let label =
    //   element.querySelector(TITLE_ELEMENT_SELECTOR) ||
    //   element.querySelector(DESCRIPTION_ELEMENT_SELECTOR);
    // if (label) {
    //   let labelId = label.getAttribute('id') || guidFor(element);
    //   label.setAttribute('id', labelId);
    //   this.ariaLabelledBy = labelId;
    // }
  }
}
