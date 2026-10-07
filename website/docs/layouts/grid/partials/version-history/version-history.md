## 7.0.0

Changed the layout CSS custom property prefix from `--hds-*` to `--hds-var-*`.

- `hds-layout-grid-column-fill-type` → `hds-var-layout-grid-column-fill-type`
- `hds-layout-grid-column-gap` → `hds-var-layout-grid-column-gap`
- `hds-layout-grid-column-min-width` → `hds-var-layout-grid-column-min-width`
- `hds-layout-grid-column-span` → `hds-var-layout-grid-column-span`
- `hds-layout-grid-column-span-lg` → `hds-var-layout-grid-column-span-lg`
- `hds-layout-grid-column-span-md` → `hds-var-layout-grid-column-span-md`
- `hds-layout-grid-column-span-sm` → `hds-var-layout-grid-column-span-sm`
- `hds-layout-grid-column-span-xl` → `hds-var-layout-grid-column-span-xl`
- `hds-layout-grid-column-span-xxl` → `hds-var-layout-grid-column-span-xxl`
- `hds-layout-grid-column-width-lg` → `hds-var-layout-grid-column-width-lg`
- `hds-layout-grid-column-width-md` → `hds-var-layout-grid-column-width-md`
- `hds-layout-grid-column-width-sm` → `hds-var-layout-grid-column-width-sm`
- `hds-layout-grid-column-width-xl` → `hds-var-layout-grid-column-width-xl`
- `hds-layout-grid-column-width-xxl` → `hds-var-layout-grid-column-width-xxl`
- `hds-layout-grid-row-gap` → `hds-var-layout-grid-row-gap`
- `hds-layout-grid-row-span` → `hds-var-layout-grid-row-span`
- `hds-layout-grid-row-span-lg` → `hds-var-layout-grid-row-span-lg`
- `hds-layout-grid-row-span-md` → `hds-var-layout-grid-row-span-md`
- `hds-layout-grid-row-span-sm` → `hds-var-layout-grid-row-span-sm`
- `hds-layout-grid-row-span-xl` → `hds-var-layout-grid-row-span-xl`
- `hds-layout-grid-row-span-xxl` → `hds-var-layout-grid-row-span-xxl`

## 6.1.0

Converted component to gts format.


## 6.0.0

Added responsive options to the `@colspan` and `@rowspan` arguments. Supported views include: "sm", "md", "lg", "xl", and "xxl".`


Added responsive column width options to the `@columnWidth` argument. Supported views include: "sm", "md", "lg", "xl", and "xxl".


## 4.21.1

Fixed issue in which `gap` & `columnMinWidth` values were improperly inherited by nested `Grid` components, added "0" as a supported `gap` value.

## 4.21.0

Added @columnWidth to set "fixed" width for columns

## 4.20.2

added missing types to the barrel export file

## 4.20.0

Added missing export of component/subcomponent

## 4.18.1

Added new Grid component
