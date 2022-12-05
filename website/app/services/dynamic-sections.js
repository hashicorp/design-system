import Service from '@ember/service';
import { A } from '@ember/array';

export default class DynamicSectionsService extends Service {
  // I _think_ we can't use a normal array, because it needs to be mutable object
  // see: https://api.emberjs.com/ember/2.15/classes/Ember.MutableArray/methods/pushObjects?anchor=pushObjects
  sections = A([]);
  tabs = A([]);

  // resetSections() {
  //   this.sections.clear();
  // }

  updateSections(sections) {
    console.log('calling "setSections" on DynamicSectionsService', sections);
    this.sections.clear();
    this.sections.pushObjects(sections);
    const tabs = this.sections.map((section) => {
      return {
        label: section.name,
        target: section.element,
      };
    });
    this.tabs.clear();
    this.tabs.pushObjects(tabs);
    // this.sections.push(section);
  }
}
