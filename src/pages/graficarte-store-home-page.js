import { LitElement, html, css } from 'lit';
import 'sophos-card/sophos-card';
import 'sophos-chimera-button/sophos-chimera-button';
export class GraficarteStoreHomePage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.products = [];
    this.altImage = 'non available';
    this.productCardButtonsHandlers = {};
    this.productCardButtons = [
      {
        label: 'Comprar',
        key: 'buy-product',
      },
      {
        label: 'Añadir al carrito',
        key: 'add-to-cart',
      }
    ],
    this.shownBuyingOptions = false;
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      products : { type : Array },
      altImage : { type : String },
      shownBuyingOptions:  { type: Boolean },
    };
  }

  static get styles () {
    return css`
      #home-page-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .product-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .buttons-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .product-button {
        border-radius: 30px;
      }

      sophos-card {
        --sophos-card-host-width: 100%;
        --sophos-card-host-max-width: 200px;
        --sophos-card-host-min-width: 100px;
        --sophos-card-main-container-background-color: transparent;
        margin: clamp(20px, 40px, 90px);
        flex-grow: 2;
      }
    `;
  }

  firstUpdated (){
    super.firstUpdated();
    this.productCardButtonsHandlers = {
      'buy-product' : this._buyProduct,
      'add-to-cart' : this._addProductToCart,
    };
  }

  showProducts (){
    return this.products.map(product => html`
    <div class="product-container">  
      <sophos-card
      .configContent=${['title', 'pickture', 'subtitle', 'description']}
      .pictureSRC=${product.productImage}
      .pictureAlt=${product.productName}
      .cardTitle=${product.productName}
      .subtitle= ${`$${product.price}`}
      .description=${product.desctiption}
      ></sophos-card>

      ${this.shownBuyingOptions ? html`
        <sophos-chimera-button
          product-id=${product.id}
          type="simple-multi-button"
          class="product-card-buttons"
          .buttonsLabels=${this.productCardButtons}
          @sophos-chimera-button-click=${this._manageProductCardButtons}>

        </sophos-chimera-button>
      ` : html``}
    </div>
  `)
  }

  _buyProduct ( productDescription){
    this.dispatchEvent(new CustomEvent('buy-product', {
      detail: {
        productDescription
      }
    }))
  }

  _addProductToCart (productDescription){
    this.dispatchEvent(new CustomEvent('add-product-to-cart', {
      detail: {
        productDescription
      }
    }))
  }

  _manageProductCardButtons (e) {
    const { key } = e.detail.buttonDescription;
    const productId = e.currentTarget.getAttribute('product-id');

    const handler = this.productCardButtonsHandlers[key].bind(this);

    const productDescription = this.products.filter(item => item.id === productId);

    handler(...productDescription);
  }

  render () {
    return html`
      <div id="home-page-container">
        ${this.showProducts()}
      </div>
    `;
  }
}
customElements.define('graficarte-store-home-page', GraficarteStoreHomePage);
