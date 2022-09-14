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
    this.mainPage = '';
    this.clientContent = '';
    this.templateStyle = '';
    this.templateClass = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  /**
  * Object describing property-related metadata used by Polymer features
  */
  static get properties () {
    return {
      mainPage: { type: String },
      clientContent: { type: String },
      templateStyle: { type: String },
      templateClass: { type: String },
      isCreateAccountOptionDisplayed: { type: Boolean },
      isShoppingCartIconDisplayed: { type: Boolean },
      shownBuyingOptions: { type: Boolean },
    };
  }

  static get styles () {
    return styles;
  }

  setValidCreateAccountPassword () {
    this.isValidCreateAccountPassword = true;
  }

  setInvalidCreateAccountPassword () {
    this.isValidCreateAccountPassword = false;
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

  login (e) {
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('request-access-for-user', {
      detail
    }))
  }

  updateUserData (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('request-update-of-user-data', { 
      detail
    }))
  }

  headerNavigation (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('header-navigation', {
      detail
    }))
  }

  searchTerm (){}

  openShoppingCartPage () {
    this.dispatchEvent(new CustomEvent('open-shopping-cart-page',{
      detail: 'shopping-cart-page',
    }));
  }

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
            @open-shopping-cart-page=${this.openShoppingCartPage}
            @header-page-change=${this.headerNavigation}>
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
              .name=${this.userData?.name}
              .lastName=${this.userData?.lastName}
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
