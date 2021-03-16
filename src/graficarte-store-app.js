import { LitElement, html } from 'lit-element';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import productMocks from './mocks/products-mocks';
import inventoryMocks from './mocks/inventory-mocks'
import './pages/graficarte-store-inventory-page'
import './pages/graficarte-store-home-page';
import './pages/graficarte-store-login-page';
import './pages/graficarte-store-create-account';
import './utils/graficarte-store-admin-nav-bar';
import './utils/graficarte-store-client-nav-bar';
import './utils/graficarte-store-header';
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
    this.page = 'public-store';
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

  signIn(e) {
    if(e){
      this.page = 'client-store';
    };
  };

  logOut(){
    this.page = 'public-store'
  }

  showLoginPage () {
    this.page = 'login';
  };

  showCreateAccountPage() {
    this.page = 'create-account'
  };

  searchTerm(e){
    console.log(e.detail.term);
  };

  render() {
    return html`
      <div id="main-app-container">
      ${this.page === 'create-account' ? html`

        <sophos-simple-template 
          id="create-account-container"
          page-name="${this.page}">

          <graficarte-store-header
            slot="header-content"
            ?isCreateAccountAvailable = "${false}"
            @searching-for-term="${this.searchTerm}">
            </graficarte-store-header>

            <graficarte-store-create-account 
            .products="${this.storeProducts}" 
            slot="main-view-content">
            </graficarte-store-create-account>

        </sophos-simple-template>
      ` : html``}
      ${this.page === 'client-store' ? html`

          <sophos-simple-template 
            id="client-store-container"
            styleTemplate="full-nav"
            page-name="${this.page}">

              <graficarte-store-header
              slot="header-content"
              ?iscreateaccountavailable="${false}"
              @searching-for-term="${this.searchTerm}">
              </graficarte-store-header>

              <graficarte-store-home-page 
              .products="${this.storeProducts}" 
              slot="main-view-content">
              </graficarte-store-home-page>

              <graficarte-store-client-nav-bar
              @finish-sesion="${this.logOut}"
              slot="nav-bar-content">
              </graficarte-store-client-nav-bar>

          </sophos-simple-template>
        ` : html``}
        ${this.page === 'inventory' ? html`
          
          <sophos-simple-template
            id="admin-inventory-container"
            styleTemplate="full-nav"
            page-name="${this.page}">

            <graficarte-inventory-page 
              .products="${this.inventory}" 
              slot="main-view-content">
            </graficarte-inventory-page>

            <graficarte-store-admin-nav-bar
            @finish-sesion="${this.logOut}"
              slot="nav-bar-content">
            </graficarte-store-admin-nav-bar>

          </sophos-simple-template>
    
        ` : html``}
        ${this.page === 'public-store' ? html`

          <sophos-simple-template 
            id="public-store-container"
            page-name="${this.page}">

            <graficarte-store-header
              slot="header-content"
              ?isCreateAccountAvailable = "${true}"
              @searching-for-term="${this.searchTerm}"
              @create-new-account="${this.showCreateAccountPage}"
              @sign-in="${this.showLoginPage}">
              </graficarte-store-header>

              <graficarte-store-home-page 
              .products="${this.storeProducts}" 
              slot="main-view-content">
              </graficarte-store-home-page>

          </sophos-simple-template>
        ` : html``}
        ${this.page === 'login' ? html`

          <graficarte-login-page
           @graficarte-login-submit="${this.signIn}">
           </graficarte-login-page>

    ` : html``}
      </div>
  `;
  };
};
customElements.define('graficarte-store-app', GraficarteStoreApp);