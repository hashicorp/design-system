import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked exampleData = [
    { id: 1, os: 'darwin' },
    { id: 2, os: 'linux' },
    { id: 3, os: 'windows' },
  ];

  get canDeleteRow() {
    return this.exampleData.length > 1;
  }

  @action
  onAddRow() {
    this.exampleData = [
      ...this.exampleData,
      { os: '', id: this.exampleData.length + 1 },
    ];
  }

  @action
  onDeleteRow(rowToDelete) {
    if (this.exampleData.length === 1) {
      this.exampleData = [
        { id: 1, os: '' },
      ];
    }
    else {
      this.exampleData = this.exampleData.filter(
        (item) => item.id !== rowToDelete.id,
      );
    }
  }
}
