import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocCopyButtonComponent extends Component {
  // options are `solid` or `ghost`
  @tracked type = this.args.type ?? 'solid';
  @tracked status = 'idle';
  @tracked iconName = 'clipboard-copy';
  @tracked timer;

  get label() {
    let label;
    if (this.type === 'solid') {
      switch (this.status) {
        case 'success':
          label = 'Copied';
          break;
        case 'error':
          label = 'Error';
          break;
        default:
          label = 'Copy';
          break;
      }
    }
    return label;
  }

  get textToCopy() {
    return this.args.encoded
      ? decodeURI(this.args.textToCopy)
      : this.args.textToCopy;
  }

  get textToShow() {
    let textToShow;
    if (this.type === 'ghost') {
      textToShow = this.args.textToShow ?? this.args.textToCopy;
    }
    return textToShow;
  }

  @action
  onSuccess() {
    this.status = 'success';
    this.iconName = 'clipboard-checked';
    this.resetStatusDelayed();
  }

  @action
  onError() {
    this.status = 'error';
    this.iconName = 'alert-triangle';
    this.resetStatusDelayed();
  }

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = 'idle';
      this.iconName = 'clipboard-copy';
    }, 2000);
  }

  get classNames() {
    let classes = ['doc-copy-button'];
    classes.push(`doc-copy-button--type-${this.type}`);
    classes.push(`doc-copy-button--status-${this.type}`);
    return classes.join(' ');
  }
}
