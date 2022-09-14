import { LitElement, html } from 'lit';
import styles from './graficarte-store-main-view-styles';
import './pages/graficarte-store-page-router';
import '../graficarte-store-complements/graficarte-store-side-bar/graficarte-store-side-bar';
import '../graficarte-store-complements/graficarte-store-header/graficarte-store-header';
import '../graficarte-store-complements/graficarte-store-modal/graficarte-store-modal';

export class GraficarteStoreMainView extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.signInForm = [];
    this.mainPage = '';
    this.clientContent = '';
    this.templateStyle = '';
    this.templateClass = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
    this._loginData = {};
    this._signinData = {};
    this._clientData = {};
    this.updatedUserData = {};
  }

    /**
    * Object describing property-related metadata used by Polymer features
    */
     static get properties () {
      return {
        page: { type: String },
        clientContent: { type: String },
        templateStyle: { type: String },
        isCreateAccountOptionDisplayed: { type: Boolean },
        isShoppingCartIconDisplayed: { type: Boolean },
        _loginData: { type: Object },
        _signinData: { type: Object },
        _clientData: { type: Object },
        updatedUserData: { type: Object },
      };
    }

  static get styles () {
    return styles;
  }

  firstUpdated () {
    super.firstUpdated();
    this.showPublicStore();
  }

  setValidCreateAccountPassword () {
    this.isValidCreateAccountPassword = true;
  }

  setInvalidCreateAccountPassword () {
    this.isValidCreateAccountPassword = false;
  }

  login (e) {
    this._loginData = e.detail.userCredentials;
  }

  cancelLogin () {
    this._loginData = {};
    this.showPublicStore();
  }

  addProductToCart (e){
    console.log('im adding to cart this product:');
    console.log(e.detail.productDescription);
  }

  buyProduct (e){
    console.log('im buying this product:');
    console.log(e.detail.productDescription);
  }

  updateUserData (e){
    const payload = e.detail;
    this.dispatchEvent(new CustomEvent('request-update-of-user-data', { 
      detail: payload
    }))
  }

  showPublicStore () {}

  setLoginConfig () {
    this.templateStyle = 'full-header';
    this.templateClass = 'login-store-container';
    this.isCreateAccountOptionDisplayed = false;
  }

  setCreateAccountConfig () {
    this.templateStyle = 'full-header';
    this.templateClass = 'create-account-container';
  }

  successSignIn () {}

  successLoginRequest () {}

  render () {
    return html`
        <sophos-simple-template
          id="app-main-template"
          .page-name=${this.mainPage}
          .styleTemplate=${this.templateStyle}
          .class=${this.templateClass}>
          <div slot="header-content">
            <graficarte-store-header
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            ?isShoppingCartIconEnable=${this.isShoppingCartIconDisplayed}
            @searching-for-term=${this.searchTerm}
            @shopping-cart-page=${this.openShoppingCartPage}>
            </graficarte-store-header>
          </div>
          <div slot="main-view-content">
            <graficarte-store-page-router
              .products=${this.inventory}
              .shownBuyingOptions=${this.shownBuyingOptions}
              .userData=${this.userData}
              @create-account=${this.createAccount}
              @cancel-create-account=${this.cancelCreateAccount}
              @graficarte-login-submit=${this.login}
              @graficarte-cancel-login=${this.cancelLogin}
              @valid-password=${this.setValidCreateAccountPassword}
              @invalid-password=${this.setInvalidCreateAccountPassword}
              @add-product-to-cart=${this.addProductToCart}
              @buy-product=${this.buyProduct}
              @graficarte-store-profile-has-changed=${this.updateUserData}>
            </graficarte-store-page-router>
          </div>
          <div slot="nav-bar-content">
            <graficarte-store-side-bar
              .name=${this.userData.name}
              .lastName=${this.userData.lastName}
              @graficarte-navigate-to-page=${this.clientNavigation}
              @finish-sesion=${this.openLogoutModal}>
            </graficarte-store-side-bar>
          </div>
        </sophos-simple-template>

        <graficarte-store-modal>
        </graficarte-store-modal>
    `;
  }
}
customElements.define('graficarte-store-main-view', GraficarteStoreMainView);
