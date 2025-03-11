interface HdsAdvancedTableColumnArgs {
  key: string;
}

export default class HdsAdvancedTableColumn {
  key: string;

  constructor({ key }: HdsAdvancedTableColumnArgs) {
    this.key = key;
  }
}
