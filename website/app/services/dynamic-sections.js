import Service from '@ember/service';
import { A } from '@ember/array';

export default class DynamicSectionsService extends Service {
  // I _think_ we can't use a normal array, because it needs to be mutable object
  // see: https://api.emberjs.com/ember/2.15/classes/Ember.MutableArray/methods/pushObjects?anchor=pushObjects
  sections = A([]);
  tabs = A([]);
  // TODO add handling of current "section/tab" on page load here (based on URL)?
  current = 0;

  // resetSections() {
  //   this.sections.clear();
  // }

  updateSections(sections) {
    console.log('calling "setSections" on DynamicSectionsService', sections);
    this.sections.clear();
    this.sections.pushObjects(sections);
    const tabs = this.sections.map((section, index) => {
      return {
        index,
        label: section.name,
        target: section.element,
        isCurrent: index === this.current,
      };
    });
    this.tabs.clear();
    this.tabs.pushObjects(tabs);
    console.log('tabs in "updateSections"', this.tabs);
  }

  setCurrent(index) {
    console.log('calling "setCurrent" on DynamicSectionsService', index);
    this.current = index;
    this.tabs.forEach((tab) => {
      tab.isCurrent = tab.index === index;
    });
    console.log('set sections in "setCurrent"', this.tabs);
  }
}
