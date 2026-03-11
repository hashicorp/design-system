import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked exampleData = [
    { id: 1, name: 'Judith Maxene', email: 'j.maxene@randatmail.com' },
    { id: 2, name: 'Elmira Aishah', email: 'e.aishah@randatmail.com' },
  ];

  get canDeleteRow() {
    return this.exampleData.length > 1;
  }

  @action
  onAddRow() {
    this.exampleData = [
      ...this.exampleData,
      { name: '', email: '', id: this.exampleData.length + 1 },
    ];
  }

  @action
  onDeleteRow(rowToDelete) {
    if (this.exampleData.length === 1) {
      this.exampleData = [
        { id: 1, name: '', email: '' },
      ];
    } else {
      this.exampleData = this.exampleData.filter(
        (item) => item.id !== rowToDelete.id,
      );
    }
  }
}
