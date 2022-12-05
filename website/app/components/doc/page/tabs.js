import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

const hideTabs = (tabIds) => {
  console.log('hideTabs', tabIds);
  // tabIds.forEach((tabId) => {
  //   document.getElementById(`section-${tabId}`).style.display = 'none';
  //   document.getElementById(`toc-${tabId}`).style.display = 'none';
  // });
};

const showTab = (tabId) => {
  console.log('showTab', tabId);
  // document.getElementById(`section-${tabId}`).style.display = '';
  // document.getElementById(`toc-${tabId}`).style.display = '';
};

export default class DocPageTabsComponent extends Component {
  @service('dynamic-sections') dynamicSections;

  @action
  onClickTab(tab) {
    console.log(`clicked ${tab.label} tab!`);
    this.dynamicSections.setCurrent(tab.index);
    // hideTabs(this.tabs);
    // showTab(tabId);
  }
}
