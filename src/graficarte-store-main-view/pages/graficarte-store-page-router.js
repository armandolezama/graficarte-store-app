import { LitElement, html } from 'lit';
import './graficarte-store-create-account/graficarte-store-create-account';
import './graficarte-store-error-page/graficarte-store-error-page';
import './graficarte-store-home-page/graficarte-store-home-page';
import './graficarte-store-inventory-page/graficarte-store-inventory-page';
import './graficarte-store-login-page/graficarte-store-login-page';
import './graficarte-store-notifications/graficarte-store-notifications';
import './graficarte-store-payment-methods/graficarte-store-payment-methods';
import './graficarte-store-profile/graficarte-store-profile';
import './graficarte-store-profile-configuration/graficarte-store-profile-configuration';
import './graficarte-store-shopping-cart/graficarte-store-shopping-cart';
import './graficarte-store-shopping-history/graficarte-store-shopping-history';

export class GraficarteStorePageRouter extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inventory = inventoryMocks;
      this.storeProducts = productMocks;
      this.shownBuyingOptions = false;
      this.userData = {
        name: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        id: '',
      };
      this.mainViewContent = [
        [
          'create-account',
          html`
            <graficarte-store-create-account
              @create-account=${this.createAccount}
              @cancel-create-account=${this.cancelCreateAccount}
              @valid-password=${this.setValidCreateAccountPassword}
              @invalid-password=${this.setInvalidCreateAccountPassword}>
            </graficarte-store-create-account>
          `
        ],
        [
          'client-store',
          this.contentCreator(this.clientPage, this.clientContent)
        ],
        [
          'inventory',
          html`
            <graficarte-store-inventory-page 
            .products=${this.inventory}>
            </graficarte-store-inventory-page>
          `
        ],
        [
          'public-store',
          html`
            <graficarte-store-home-page 
            .products=${this.storeProducts}>
            </graficarte-store-home-page>
          `
        ],
        [
          'login',
          html`
            <graficarte-store-login-page
            @graficarte-login-submit=${this.login}
            @graficarte-cancel-login=${this.cancelLogin}>
            </graficarte-store-login-page>
          `
        ],
      ];
      this.clientContent = [
        [
          'home',
          html`
            <graficarte-store-home-page 
            .products=${this.storeProducts}
            .shownBuyingOptions=${this.shownBuyingOptions}
            @add-product-to-cart=${this.addProductToCart}
            @buy-product=${this.buyProduct}>
            </graficarte-store-home-page>
          `
        ],
        [
          'profile',
          html`
            <graficarte-store-profile
            .userData=${this.userData}
            @graficarte-store-profile-has-changed=${this.updateUserData}>
            </graficarte-store-profile>
          `
        ],
        [
          'profile-config',
          html`
            <graficarte-store-profile-configuration>
            </graficarte-store-profile-configuration>
          `
        ],
        [
          'shopping-history',
          html`
            <graficarte-store-shopping-history>
            </graficarte-store-shopping-history>
          `
        ],
        [
          'notifications',
          html`
            <graficarte-store-notifications>
            </graficarte-store-notifications>
          `
        ],
        [
          'payment-methods',
          html`
            <graficarte-store-payment-methods>
            </graficarte-store-payment-methods>
          `
        ],
        [
          'error',
          html`
            <graficarte-store-error-page>
            </graficarte-store-error-page>
          `,
        ],
        [
          'shopping-cart',
          html`
            <graficarte-store-shopping-cart>
            </graficarte-store-shopping-cart>
          `
        ],
      ];
      this.clientPage = '';
      this.mainViewPage = '';
      this.templateStyle = '';
  }

  firstUpdated () {
    super.firstUpdated();
    this.showPublicStore();
  }

  createAccount (e) {
    this._signinData = e.detail.userData;
  }

  cancelCreateAccount () {
    this._signinData = {};
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
    this.updatedUserData = {...payload};
  }

  showPublicStore () {
    this.page = 'public-store';
    this.templateStyle = 'full-header';
    this.isCreateAccountOptionDisplayed = true;
    this.isShoppingCartIconDisplayed = false;
    this.templateClass = 'public-store-container';
    this.shownBuyingOptions = true;
  }

  setLoginConfig () {
    this.templateStyle = 'full-header';
    this.templateClass = 'login-store-container';
    this.isCreateAccountOptionDisplayed = false;
  }

  setCreateAccountConfig () {
    this.templateStyle = 'full-header';
    this.templateClass = 'create-account-container';
  }

  successSignIn (e) {
    const response = e.detail.payload;
    if (response.status >= 200 && response.status < 300) {
      this._signinData = {};
      this.page = 'client-store';
      this.clientContent = 'home';
      this.templateStyle = 'full-header';
      this.templateClass = 'client-store-container'
      this.isCreateAccountOptionDisplayed = false;
      this.isShoppingCartIconDisplayed = true;
      this.successSignin(response.data.registry)
    } else if (response.status >= 400 && response.status < 500) {
      this.setLoginErrorModal({ info: response.error.info, message: response.message });
      this.openModal();
    }
  }

  successLoginRequest (e) {
    const response = e.detail.payload;
    this._loginData = {};

    if (response.status >= 200 && response.status < 300) {
      this.page = 'client-store';
      this.templateStyle = 'full-nav';
      this.templateClass = 'client-store-container'
      this.clientContent = 'home';
      this.isCreateAccountOptionDisplayed = false;
      this.isShoppingCartIconDisplayed = true;
      this.successLogin(response.data.registry)
    } else if (response.status >= 400 && response.status < 500) {
      this.setLoginErrorModal({ info: response.error.info, message: response.message });
      this.openModal();
    }

  }

  successLogin (userData) {
    this.userData = { ...userData };
  }

  successSignin (userData) {
    this.userData = { ...userData };
  }

  successUpdatingClientData (e){
    this.userData = {...this.userData, ...e.detail.userData}
  }

  setProgressState () {
    console.log('this shit is in progress');
  }

  contentCreator (contentTag = '', templates = [['', html``]]) {
    const contentArray = templates.map(template => {
      return contentTag === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  render() {
    return html`${this.contentCreator(this.page, this.mainViewContent)}`;
  }
}
customElements.define('graficarte-store-page-router', GraficarteStorePageRouter);
