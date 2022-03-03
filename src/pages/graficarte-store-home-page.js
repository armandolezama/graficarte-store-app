import { LitElement, html, css } from 'lit';
import 'sophos-card/sophos-card';
export class GraficarteStoreHomePage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.products = [];
    this.altImage = 'non available'
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      products : { type : Array },
      altImage : { type : String }
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

  showProducts (){
    return this.products.map(product => html`
    <div class="product-container">  
      <sophos-card
      .configContent=${['title', 'pickture', 'subtitle', 'description']}
      .pictureSRC=${product.productImage}
      .pictureAlt=${this.altImage}
      .cardTitle=${product.productName}
      .subtitle= ${`$${product.price}`}
      .description=${product.desctiption}
      ></sophos-card>
    </div>
  `)
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
