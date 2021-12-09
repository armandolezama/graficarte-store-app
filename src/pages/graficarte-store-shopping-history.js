import { LitElement, html, css } from 'lit-element';
import 'sophos-plastic-table/sophos-plastic-table';

export class GraficarteStoreShoppingHistory extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.notificationsTable = [
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
    ];
    this.colnames = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth']
    this.rownames = ['first', 'second', 'third', 'fourth', 'fifth']
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      notificationsTable : { type : Array }
    };
  }

  static get styles () {
    return css`
      sophos-plastic-table {
        --sophos-plastic-table-table-cell-padding: 15px;
      }
    `;
  }

  render () {
    return html`
      <sophos-plastic-table
      .tableData=${this.notificationsTable}
      .columnNames=${this.colnames}
      .rowNames=${this.rownames}>
      </sophos-plastic-table>
    `;
  }
}

customElements.define('graficarte-store-shopping-history', GraficarteStoreShoppingHistory);