import Component from '@glimmer/component';
import { action } from '@ember/object';

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
  get tabs() {
    const orderedTabs = [
      'guidelines',
      'specifications',
      'code',
      'accessibility',
      'other',
    ];
    return orderedTabs.filter((tab) => this.args.tabs.includes(tab));
  }

  @action
  didInsert() {
    // for now we hide all the tabs apart from the first (this is a super scrappy MVP!)
    hideTabs(this.tabs.slice(1));
    showTab(this.tabs[0]);
  }

  @action
  onClickTab(tabId) {
    console.log(`clicked ${tabId} tab!`);
    hideTabs(this.tabs);
    showTab(tabId);
  }
}
