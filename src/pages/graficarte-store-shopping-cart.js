import { LitElement, html, css } from 'lit';
import 'sophos-plastic-table/sophos-plastic-table';
import 'sophos-card/sophos-card';

export class GraficarteStoreShoppingCart extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.builder = {
      cellBuilder: this._customCellBuilder.bind(this),
    };
    this.counter = 0;
    this.maxCounter = 3;
    this.columnNames = ['Product Details', 'Quantity', 'Price', 'Total'];
    this.data = [
      [
        {
          image: './assets/paint-art.jpg',
          title: 'Arte',
          description: 'Comprado hace rato, está cool',
        },
        4,
        '50.00',
        '200.00',
      ],
    ];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      builder : { type : Object }
    };
  }

  static get styles () {
    return css``;
  }

  _customCellBuilder (cell){

    const template = this._templateGenerator ? this._templateGenerator(cell) : html``;
    return template;
  }

  _templateGenerator (cell) {

    let payload = () => {};

    switch (this.counter) {
      case 0:
        payload = html`
          <div class="product-description-container">
            <sophos-card
            .configContent=${['pickture', 'title', 'description']}
            .cardTitle=${cell.title}
            .pictureSRC=${cell.image}
            .pictureAlt=${'product-image'}
            .description=${cell.description}>
            </sophos-card>
          </div>
        `;
        break;
      case 1:
        payload = html`
          <div class="product-quantity-container">

            <div class="increase-button-container">
              <button class="increase-cuantity-button">+</button>
            </div>
            
            <div class="quantity-data-container">
              <p class="quantity-data-text">
                ${cell}
              </p>
            </div>

            <div class="decrease-button-container"></div>
              <button class="decrease-cuantity-button">-</button>
            </div>
            
          </div>
        `;
        break;
      case 2:
        payload = html`
          <div>
            <p>
              ${cell}
            </p>
          </div>
        `;
        break;
      case 3:
        payload = html`
          <div>
            <p>
              ${cell}
            </p>
          </div>
        `;
        break;
    }

    ++this.counter;

    if(this.counter > this.maxCounter){
      this.counter = 0;
    }

    return payload;
  }

  render () {
    return html`
      <div id="main-container">
        <sophos-plastic-table
        .tableData=${this.data}
        .builderObject=${this.builder}>
        </sophos-plastic-table>
      </div>
    `;
  }
}
customElements.define('graficarte-store-shopping-cart', GraficarteStoreShoppingCart);