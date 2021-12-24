import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import 'sophos-plastic-table/sophos-plastic-table';
import 'sophos-card/sophos-card';

const stylesObject = {
  '.product-detail-card' : {
    '--sophos-card-host-width' : 'auto',
    '--sophos-card-main-container-flex-direction': 'row',
    '--sophos-card-picture-width' : '150px',
    '--sophos-card-picture-border-radius' : '25px',
  },
  '.product-quantity-container' : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '.increase-button-container' : {},
  '.increase-quantity-button' : {
    width: '40px',
    height: '20px',
    borderRadius: '5px',
  },
  '.quantity-data-container' : {},
  '.quantity-data-text' : {},
  '.decrease-button-container' : {},
  '.decrease-quantity-button' : {
    width: '40px',
    height: '20px',
    borderRadius: '5px',
  },
  '.product-price-container' : {},
  '.product-price-paraph' : {},
  '.product-total-container' : {},
  '.product-total-paraph' : {},
};
 
const getStyle = querySelector => styleMap(stylesObject[querySelector]);

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
    this.row = 0;
    this.counter = 0;
    this.maxCounter = 3;
    this.columnNames = ['Product Details', 'Quantity', 'Price', 'Total'];
    this.data = [
      [
        {
          image: './assets/paint-art.jpg',
          title: 'Arte',
          description: 'Listo para ser comprado',
        },
        4,
        '50.00',
        '200.00',
      ],
      [
        {
          image: './assets/paint-art.jpg',
          title: 'Arte',
          description: 'Listo para ser comprado',
        },
        4,
        '50.00',
        '200.00',
      ],
      [
        {
          image: './assets/paint-art.jpg',
          title: 'Arte',
          description: 'Listo para ser comprado',
        },
        4,
        '50.00',
        '200.00',
      ],
      [
        {
          image: './assets/paint-art.jpg',
          title: 'Arte',
          description: 'Listo para ser comprado',
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
      builder : { type : Object },
    };
  }

  static get styles () {
    return css`
      sophos-plastic-table {
        --sophos-plastic-table-plastic-table-border-collapse: separate;
        --sophos-plastic-table-plastic-table-border-spacing: 15px;
      }
    `;
  }

  _customCellBuilder (cell){

    const template = this._templateGenerator ? this._templateGenerator(cell) : html``;
    return template;
  }

  _increaseQuantity(e){
    const row = parseInt(e.target.getAttribute('row'));
    const column = parseInt(e.target.getAttribute('column'));
    const priceColumn = column + 1;
    const totalColumn = column + 2;
    
    this.data[row][column] += 1;
    
    const newTotal = this.data[row][priceColumn] * this.data[row][column];
    this.data[row][totalColumn] = `${newTotal}.00`;
    this.requestUpdate();
  }

  _decreaseQuantity(e){
    const row = parseInt(e.target.getAttribute('row'));
    const column = parseInt(e.target.getAttribute('column'));
    const priceColumn = column + 1;
    const totalColumn = column + 2;
    
    this.data[row][column] -= 1;
    
    const newTotal = this.data[row][priceColumn] * this.data[row][column];
    this.data[row][totalColumn] = `${newTotal}.00`;
    this.requestUpdate();
  }

  _templateGenerator (cell) {

    let payload = () => {};

    switch (this.counter) {
      case 0:
        payload = html`
          <div class="product-description-container">
            <sophos-card
            class="product-detail-card"
            style=${getStyle('.product-detail-card')}
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
        const increaseHandler = this._increaseQuantity.bind(this);
        const decreaseHandler = this._decreaseQuantity.bind(this);
        payload = html`
          <div 
            class="product-quantity-container"
            style=${getStyle('.product-quantity-container')}>

            <div 
              class="increase-button-container"
              style=${getStyle('.increase-button-container')}>
                <button
                  row=${this.row}
                  column=${this.counter}
                  class="increase-quantity-button"
                  style=${getStyle('.increase-quantity-button')}
                  @click=${increaseHandler}>
                
                  +
                
                </button>
            </div>
            
            <div 
              class="quantity-data-container"
              style=${getStyle('.quantity-data-container')}>
                <p class="quantity-data-text"
                  style=${getStyle('.quantity-data-text')}>
                    ${cell}
                </p>
            </div>

            <div 
              class="decrease-button-container"
              style=${getStyle('.decrease-button-container')}>
                <button
                  row=${this.row}
                  column=${this.counter}
                  class="decrease-quantity-button"
                  style=${getStyle('.decrease-quantity-button')}
                  @click=${decreaseHandler}>
                
                  -
                
                </button>
            </div>
            
          </div>
        `;
        break;
      case 2:
        payload = html`
          <div 
            class="product-price-container"
            style=${getStyle('.product-price-container')}>
              <p 
                class="product-price-paraph"
                style=${getStyle('.product-price-paraph')}>
                ${cell}
              </p>
          </div>
        `;
        break;
      case 3:
        payload = html`
          <div 
            class="product-total-container"
            style=${getStyle('.product-total-container')}>
              <p 
                class="product-total-paraph"
                style=${getStyle('.product-total-paraph')}>
                ${cell}
              </p>
          </div>
        `;
        break;
    }

    ++this.counter;

    if(this.counter > this.maxCounter){
      this.counter = 0;
      this.row += 1;
    }

    if (this.row === this.data.length) {
      this.row = 0;
    }

    return payload;
  }

  render () {
    return html`
      <div id="main-container">
        <sophos-plastic-table
        .tableData=${this.data}
        .builderObject=${this.builder}
        .columnNames=${this.columnNames}>
        </sophos-plastic-table>
      </div>
    `;
  }
}
customElements.define('graficarte-store-shopping-cart', GraficarteStoreShoppingCart);