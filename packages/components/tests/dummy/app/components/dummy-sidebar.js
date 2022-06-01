import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DummySidebarComponent extends Component {
  @action
  didInsert(element) {
    this.element = element;
    const asideList = this.element.querySelector('ul');
    document
      .querySelectorAll('a.dummy-link-section')
      .forEach(function (anchor) {
        const item = document.createElement('li');
        const href = anchor.attributes.href.value;
        const text = anchor.parentNode.innerText.replace(/^§\s+/, '');
        item.innerHTML = `<a href="${href}"> ${text}</a>`;
        asideList.appendChild(item);
      });
  }
}
