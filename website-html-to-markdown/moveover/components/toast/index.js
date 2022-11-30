import Component from '@glimmer/component';

export default class Index extends Component {
  get noop() {
    return () => {};
  }

  get yourOnDismissFunction() {
    return () => {
      console.log('Clicked the "dismiss" button in the "toast"!');
    };
  }

  get yourOnClickFunction() {
    return () => {
      console.log('Clicked the button in the "tag"!');
    };
  }
}
