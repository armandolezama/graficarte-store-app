import { LitElement, html } from 'lit';
import styles from './graficarte-store-main-view-styles';
import './pages/graficarte-store-page-router';
import '../graficarte-store-complements/graficarte-store-side-bar/graficarte-store-side-bar';
import '../graficarte-store-complements/graficarte-store-header/graficarte-store-header';
import '../graficarte-store-complements/graficarte-store-modal/graficarte-store-modal';
import 'sophos-simple-template/sophos-simple-template';
import 'sophos-simple-modal/sophos-simple-modal';

export class GraficarteStoreMainView extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.signInForm = [];
    this.page = '';
    this.clientContent = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this._loginData = {};
    this._signinData = {};
    this._clientData = {};
    this.updatedUserData = {};
    this.clientPage = '';
    this.mainViewPage = '';
    this.templateStyle = '';
  }

    /**
    * Object describing property-related metadata used by Polymer features
    */
     static get properties () {
      return {
        page: { type: String },
        clientContent: { type: String },
        templateStyle: { type: String },
        isModalOpened: { type: Boolean },
        modalTitle: { type: String },
        modalMessage: { type: String },
        modalFooterMessage: { type: String },
        isCreateAccountOptionDisplayed: { type: Boolean },
        isShoppingCartIconDisplayed: { type: Boolean },
        _loginData: { type: Object },
        _signinData: { type: Object },
        _clientData: { type: Object },
        updatedUserData: { type: Object },
      };
    }

  static get styles() {
    return styles;
  }

  firstUpdated () {
    super.firstUpdated();
    this.showPublicStore();
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

  render() {
    return html`
        <sophos-simple-template
          id="app-main-template"
          page-name=${this.page}
          .styleTemplate=${this.templateStyle}
          .class=${this.templateClass}>
          <div slot="header-content">
            <graficarte-store-header>
            </graficarte-store-header>
          </div>
          <div slot="main-view-content">
            <graficarte-store-page-router>
            </graficarte-store-page-router>
          </div>
          <div slot="nav-bar-content">
            <graficarte-store-side-bar>
            </graficarte-store-side-bar>
          </div>
        </sophos-simple-template>

        <graficarte-store-modal>
        </graficarte-store-modal>
    `;
  }
}
customElements.define('graficarte-store-main-view', GraficarteStoreMainView);
