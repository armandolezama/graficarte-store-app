import { LitElement, html, css } from 'lit-element';
import 'sophos-card/sophos-card'

export class GraficarteStoreInventoryPage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.products = [];
    this.altImage = 'non available'
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      products : { type : Array },
      altImage : { type : String }
    };
  };

  static get styles() {
    return css`
      #inventory-main-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    sophos-card{
      margin: 20px;
    }
    `;
  }

  render() {
    return html`
    <div id="inventory-main-container">
      ${this.products.map(product => html`
          <sophos-card
          .pictureSRC = "${product.productImage}"
          .pictureAlt = "${this.altImage}"
          .title = "${product.productName}"
          .subtitle = "En stock: ${product.stock}"
          ></sophos-card>
      `)}
    </div>
    `;
  };
};
customElements.define('graficarte-store-inventory-page', GraficarteStoreInventoryPage);