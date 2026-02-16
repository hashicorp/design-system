import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  get myDataItems() {
    return [
      {
        product: 'Terraform',
        brandColor: 'purple',
        usesHelios: true,
      },
      {
        product: 'Nomad',
        brandColor: 'green',
        usesHelios: true,
      },
      {
        product: 'Vault',
        brandColor: 'yellow',
        usesHelios: true,
      },
    ];
  }
}
