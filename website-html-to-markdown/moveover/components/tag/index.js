import Component from '@glimmer/component';

export default class Index extends Component {
  get yourOnDismissFunction() {
    return () => {
      console.log('Clicked the "dismiss" button in the "tag"!');
    };
  }
}
