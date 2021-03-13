import { LitElement, html } from 'lit-element';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import productMocks from './products-mocks';
import inventoryMocks from './inventory-mocks'
import './pages/graficarte-inventory-page'
import './pages/graficarte-store-home-page';
import './pages/graficarte-login-page';
export class GraficarteStoreApp extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inventory = inventoryMocks;
    this.storeProducts = productMocks;
    this.page = 'inventory';
  };

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      storeProducts : { type : Array },
      page : { type : Array}
    };
  }

  static get styles() {
    return styles;
  };

  searchProduct (e){
    console.log(e.target.value);
  };

  loginSubmit (e){
    console.log(e.detail);
  };

  render() {
    return html`
      <div id="main-app-container">
        ${this.page === 'inventory' ? html`
          <sophos-simple-template
            id="admin-inventory-container"
            styleTemplate="full-nav"
            page-name="${this.page}">
            <graficarte-inventory-page 
              .products="${this.inventory}" 
              slot="main-view-content">
            </graficarte-inventory-page>
          </sophos-simple-template>
        ` : html``}
        ${this.page === 'store' ? html`
          <sophos-simple-template 
            id="public-store-container"
            page-name="${this.page}">
              <div 
                id="search-bar" 
                slot="header-content">
                <input 
                  id="search-bar-input" 
                  type="text" name="search-bar" 
                  placeholder="buscar" 
                  @input="${this.searchProduct}">
              </div>
              <graficarte-store-home-page 
              .products="${this.storeProducts}" 
              slot="main-view-content">
              </graficarte-store-home-page>
          </sophos-simple-template>
        ` : html``}
        ${this.page === 'login' ? html`
          <graficarte-login-page
          @graficarte-login-submit="${this.loginSubmit}"></graficarte-login-page>
        ` : html``}
      </div>
    `;
  }
}
customElements.define('graficarte-store-app', GraficarteStoreApp);