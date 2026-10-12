Use Table Generator to create HDS tables without manually assembling repeated components. Configure the table structure first, then review and refine the generated table in Figma.

## Before you begin

Make sure the required HDS table components are available in the current Figma file. Plan the table's headers, columns, rows, and cell content before generating it.

## Create a table

1. Open **Table Generator**.
2. Choose a **Standard** or **Advanced** table type.
3. Set the number of rows and columns. You can create 1-100 rows and 1-20 columns.
4. Select table options, including size, multi-select, striped rows, and component grouping.
5. Add column labels. Select a column's settings icon to configure its alignment, sorting, and cell content.
6. Select **Generate Table**.
7. Review the generated table before continuing design work.

Column cells can contain text, leading or trailing icons, or a generic HDS component. Supported generic components are Badge, Badge Count, Button, Link, and Tag.

![Placeholder: the Table Generator configuration form with table type, dimensions, options, and column labels.](/assets/tooling/design-tooling-figma-plugin/table-generator-configuration.png)

![Placeholder: the column settings screen with alignment, sortable, and cell content controls.](/assets/tooling/design-tooling-figma-plugin/table-generator-column-settings.png)

![Placeholder: a generated HDS table on the Figma canvas.](/assets/tooling/design-tooling-figma-plugin/table-generator-output.png)

## Edit a generated table

1. Select the root of a generated HDS table on the Figma canvas.
2. Open **Table Generator**.
3. Select **Sync configuration** to load the saved table configuration.
4. Change the configuration, then select **Regenerate Table** to apply it.

The plugin saves configuration with the generated table. If you manually change the table structure, sync the configuration before editing so the plugin can read the current structure.

![Placeholder: a selected generated table and the Sync configuration action in the plugin.](/assets/tooling/design-tooling-figma-plugin/table-generator-sync-configuration.png)

## Troubleshooting

### The generated table is not structured as expected

Review the table and column settings, then regenerate the table. Use normal Figma editing to make any final content or layout refinements.

### I can't edit a selected table

Select the root generated table, reopen the plugin, and select **Sync configuration**. If the table can't be read, create a new table using the intended configuration.

### The plugin reports missing components

Confirm that the required HDS components are available in the file, then generate the table again.
