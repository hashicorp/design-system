import Component from '@glimmer/component';

/**
 *
 * `Table` renders an HTML table styled using the `pdsTable` class. It is primarily used to reduce
 * boilerplate, drive consistency, and hook into column sorting logic.
 *
 *
 * ```
 * <Table @model={{this.data}} @sortProperty="name" @sortDescending={{false}}>
 *   <:head as |h|>
 *     <h.SortBy @field="name">Name</h.SortBy>
 *     <th>Unsortable Data</th>
 *   </:head>
 *   <:body as |row|>
 *     <tr>
 *       <td>{{row.name}}</td>
 *       <td>{{row.complex}} {{row.data}} {{row.goes.here}}</td>
 *     </tr>
 *   </:body>
 * </Table>
 * ```
 *
 * ## :head named block
 *
 * This represents the `thead` of the table. It yields within a single `tr` that is meant
 * to represent column headers.
 *
 * It also yields a single contextual component, `SortBy` which applies the `@sortProperty` and
 * `@sortDescending` args from the `Table` component. This way only `@field` needs to be set to
 * determine the visual state and the generated anchor href.
 *
 *
 * ## :body named block
 *
 * This represents the `tbody` of the table. It yields `n` number of times where `n` is equal to
 * the length of the `@model` arg provided to `Table`. The yield happens directly in the `tbody`
 * element to allow for multiple `tr`s for a single record. The yielded value is the exact record
 * from the `@model` array.
 *
 * @class Table
 */
export default class HdsTableIndexComponent extends Component {
  /**
   * Sets the data source that gets yielded by the `:body` named block.
   * @argument model
   * @type {?array}
   */
  /**
   * Specifies which field the `@model` is sorted by. This **does not perform a sort**.
   * It is only used to set states on the contextual `SortBy` components.
   * @argument sortProperty
   * @type {?string}
   */
  /**
   * Specifies which direction the `@model` is sorted. Descending when `true`, ascending when
   * `false`. This **does not perform a sort**. It is only used to set states on the
   * contextual `SortBy` components.
   * @argument sortDescending
   * @type {?boolean}
   */

  // Convenience getter since all query params are strings.
  get sortDescending() {
    const arg = this.args.sortDescending;
    if (typeof arg === 'boolean') return arg;
    return arg === 'true';
  }
}
