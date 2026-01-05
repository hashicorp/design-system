import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

const STORAGE_KEY = 'website:accordion:item-2-state';

export default class AccordionPersistState extends Component {
  @tracked itemState;
  @service fastboot;

  constructor(owner, args) {
    super(owner, args);
    if (!this.fastboot.isFastBoot) {
      this.itemState = sessionStorage.getItem(STORAGE_KEY) ?? 'open';
    }
  }

  @action
  onItemToggle() {
    this.itemState = this.itemState === 'open' ? 'close' : 'open';
    sessionStorage.setItem(STORAGE_KEY, this.itemState);
  }
}
