import { LitElement, html } from 'lit';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import './pages/graficarte-store-inventory-page';
import './pages/graficarte-store-home-page';
import './pages/graficarte-store-login-page';
import './pages/graficarte-store-create-account';
import './pages/graficarte-store-profile';
import './pages/graficarte-store-profile-configuration';
import './pages/graficarte-store-payment-methods';
import './pages/graficarte-store-error-page';
import './pages/graficarte-store-shopping-cart';
import './pages/graficarte-store-shopping-history';
import './pages/graficarte-store-notifications';
import './complements/graficarte-store-admin-nav-bar';
import './complements/graficarte-store-client-nav-bar';
import './complements/graficarte-store-header';
import './controllers/graficarte-store-login-controller';
import './controllers/graficarte-store-sign-in-controller';
import productMocks from './mocks/products-mocks';
import inventoryMocks from './mocks/inventory-mocks';

export class GraficarteStoreApp extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inventory = inventoryMocks;
    this.storeProducts = productMocks;
    this.signinMissingFields = [];
    this.loginMissingFields = [];
    this.signInForm = [];
    this.page = '';
    this.clientContent = '';
    this.showCreateAccountMissingFieldsMessages = false;
    this.isValidCreateAccountPassword = false;
    this.isCreateAccountOptionDisplayed = false;
    this._loginData = {};
    this._signinData = {};
    this._clientData = {};
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties () {
    return {
      inventory : { type : Array },
      storeProducts : { type : Array },
      signinMissingFields : { type : Array },
      loginMissingFields : { type : Array },
      page : { type : String},
      clientContent : { type : String},
      showCreateAccountMissingFieldsMessages : { type : Boolean},
      isCreateAccountOptionDisplayed : { type : Boolean},
      _loginData : { type : Object},
      _signinData : { type : Object},
      _clientData : { type : Object},
    };
  }

  static get styles () {
    return styles;
  }

  firstUpdated (){
    super.firstUpdated();
    this.showPublicStore();
  }

  showPublicStore (){
    this.page = 'public-store';
    this.isCreateAccountOptionDisplayed = true;
  }

  login (e) {
    this.showLoginMissingFields = true;
    this._loginData = {...e.detail.userCredentials};
  }

  cancelLogin (){
    this.showPublicStore();
  }

  logOut () {
    this.showPublicStore();
  }

  createAccount (e) {
    this.showCreateAccountMissingFieldsMessages = true;
    this._signinData = e.detail.userData;
  }

  cancelCreateAccount () {
    this.showCreateAccountMissingFieldsMessages = false;
    this.showPublicStore();
  }

  setValidCreateAccountPassword (){
    this.isValidCreateAccountPassword = true;
  }

  setInvalidCreateAccountPassword (){
    this.isValidCreateAccountPassword = false;
  }

  setCreateAccountMissingFields (e){
    if (this.showCreateAccountMissingFieldsMessages) {
      const { emptyFields } = e.detail;
      this.signinMissingFields = emptyFields;
    }
  }

  setLoginMissingFields (e){
    if (this.showLoginMissingFields) {
      const { emptyFields } = e.detail;
      this.loginMissingFields = emptyFields;
    }
  }

  successSignIn (e){
    console.log(e.detail.payload)
    this.page = 'client-store';
    this.clientContent = 'home';
  }

  successLogin (e){
    console.log(e.detail.payload)
    this.page = 'client-store';
    this.clientContent = 'home';
  }

  setProgressState (){
    console.log('this shit is in progress');
  }

  errorSignIn (e){
    const {title, message, notes} = e.detail;
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalFooterMessage = notes;
    this.openModal();
  }

  errorLogin (){
    alert('error at login');
  }

  headerNavigate (e){
    const { page } = e.detail;
    this.page = page;
  }

  searchTerm (e){
    console.log(e.detail.term);
  }

  clientNavigation (e){
    const clientPage = e.detail.page;
    this.clientContent = clientPage;
  }

  createFullContent (){
    return [
    this.page === 'create-account' && html`

      <sophos-simple-template
        id="create-account-container"
        page-name=${this.page}
        styleTemplate="full-header">

        <graficarte-store-create-account
          .missingFields=${this.signinMissingFields}
          @create-account=${this.createAccount}
          @cancel-create-account=${this.cancelCreateAccount}
          @valid-password=${this.setValidCreateAccountPassword}
          @invalid-password=${this.setInvalidCreateAccountPassword}
          slot="main-view-content">
        </graficarte-store-create-account>

      </sophos-simple-template>
    `,
    this.page === 'client-store' && html`

      <sophos-simple-template
        id="client-store-container"
        styleTemplate="full-nav"
        page-name=${this.page}>

        <graficarte-store-header
          slot="header-content"
          ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
          @searching-for-term=${this.searchTerm}>
        </graficarte-store-header>

        ${this.createClientContent()}

        <graficarte-store-client-nav-bar
          @graficarte-navigate-to-page=${this.clientNavigation}
          @finish-sesion=${this.logOut}
          slot="nav-bar-content">
        </graficarte-store-client-nav-bar>

      </sophos-simple-template>
    `,
    this.page === 'inventory' && html`
        
      <sophos-simple-template
        id="admin-inventory-container"
        styleTemplate="full-nav"
        page-name=${this.page}>

        <graficarte-store-inventory-page 
          .products=${this.inventory}
          slot="main-view-content">
        </graficarte-store-inventory-page>

        <graficarte-store-admin-nav-bar
          @finish-sesion=${this.logOut}
          slot="nav-bar-content">
        </graficarte-store-admin-nav-bar>

      </sophos-simple-template>
    `,
    this.page === 'public-store' && html`

      <sophos-simple-template
        id="public-store-container"
        page-name=${this.page}
        styleTemplate="full-header">

        <graficarte-store-header
          slot="header-content"
          ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
          @navigate=${this.headerNavigate}
          @searching-for-term=${this.searchTerm}>
        </graficarte-store-header>

        <graficarte-store-home-page 
          .products=${this.storeProducts}
          slot="main-view-content">
        </graficarte-store-home-page>

      </sophos-simple-template>
    `,
    this.page === 'login' && html`

      <graficarte-store-login-page
        .missingFields=${this.loginMissingFields}
        @graficarte-login-submit=${this.login}
        @graficarte-cancel-login=${this.cancelLogin}>
      </graficarte-store-login-page>

    `,].filter(template => template);
  }



  createClientContent (){
    return [
      this.clientContent === 'home' && html`
        <graficarte-store-home-page 
          .products=${this.storeProducts}
          slot="main-view-content">
        </graficarte-store-home-page>
      `,
      this.clientContent === 'profile' && html`
        <graficarte-store-profile
          slot="main-view-content">
        </graficarte-store-profile>
      `,
      this.clientContent === 'profile-config' && html`
        <graficarte-store-profile-configuration
          slot="main-view-content">
        </graficarte-store-profile-configuration>
      `,

      this.clientContent === 'shopping-history' && html`
        <graficarte-store-shopping-history
          slot="main-view-content">
        </graficarte-store-shopping-history>
      `,

      this.clientContent === 'notifications' && html`
        <graficarte-store-notifications
          slot="main-view-content">
        </graficarte-store-notifications>
      `,

      this.clientContent === 'payment-methods' && html`
        <graficarte-store-payment-methods
          slot="main-view-content">
        </graficarte-store-payment-methods>
      `,

      this.clientContent === 'error' && html`
        <graficarte-store-error-page
          slot="main-view-content">
        </graficarte-store-error-page>
      `,

      this.clientContent === 'shopping-cart' && html`
        <graficarte-store-shopping-cart
          slot="main-view-content">
        </graficarte-store-shopping-cart>
      `,
    ].filter(template => template);
  }

  render () {
    return html`
      <div id="main-app-container">
        
        <graficarte-store-login-controller
        .email=${this._loginData.email}
        .password=${this._loginData.password}
        @missing-fields=${this.setLoginMissingFields}
        @request-is-done=${this.successLogin}
        @request-failed=${this.errorLogin}
        @request-in-progress=${this.setProgressState}>
        </graficarte-store-login-controller>

        <graficarte-store-sign-in-controller
          .name = ${this._signinData.name}
          .lastName = ${this._signinData.lastName}
          .phoneNumber = ${this._signinData.phoneNumber}
          .email = ${this._signinData.email}
          .address = ${this._signinData.address}
          .password = ${this._signinData.password}
          ?isPasswordValid = ${this.isValidCreateAccountPassword}
          @missing-fields = ${this.setCreateAccountMissingFields}
          @request-is-done = ${this.successSignIn}
          @request-failed = ${this.errorSignIn}
          @request-in-progress=${this.setProgressState}>
        </graficarte-store-sign-in-controller>

      ${this.createFullContent()}
      </div>
    `;
  }
}

customElements.define('graficarte-store-app', GraficarteStoreApp);

/**
 * TO-DO: Add session management system 
 * (caché, local session, token) for aplication
 */

 /**
  * TO-DO: Add recovery password feature 
  */

 /**
  * TO-GO: Add change password feature
  */

 /**
  * TO-DO: Add buy product feature
  */