import Component from '@glimmer/component';

export default class FileWithFrontmatter extends Component {
  get test() {
    console.log(this, this.attributes);
    return 'this is a test';
  }
}
