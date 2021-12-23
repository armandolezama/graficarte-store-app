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
    this.templateStyle = '';
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
      templateStyle : { type : String},
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
    this.templateClass = 'public-store-container';
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

  setLoginConfig (){
    this.templateStyle = 'full-header';
    this.templateClass = 'login-store-container';
    this.isCreateAccountOptionDisplayed = false;
  }

  setCreateAccountConfig (){
    this.templateStyle = 'full-header';
    this.templateClass = 'create-account-container';
  }

  successSignIn (e){
    console.log(e.detail.payload)
    this.page = 'client-store';
    this.clientContent = 'home';
    this.templateStyle = 'full-header';
    this.templateClass = 'client-store-container'
  }

  successLogin (e){
    console.log(e.detail.payload)
    this.page = 'client-store';
    this.clientContent = 'home';
    this.templateStyle = 'full-header';
    this.templateClass = 'client-store-container'
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
    return page === 'login' ? this.setLoginConfig() : this.setCreateAccountConfig();
  }

  searchTerm (e){
    console.log(e.detail.term);
  }

  clientNavigation (e){
    const clientPage = e.detail.page;
    this.clientContent = clientPage;
  }

  contentCreator (contentController = '', templates = [['', html``]]){
    const contentArray = templates.map(template => {
      return contentController === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  createClientContent (){
    const templates = [
      [
        'home',
        html`
          <graficarte-store-home-page 
            .products=${this.storeProducts}>
          </graficarte-store-home-page>
        `
      ],
      [
        'profile',
        html`
          <graficarte-store-profile>
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

    return this.contentCreator(this.clientContent, templates);
  }

  createMainViewContent (){
    const templates = [
      [
        'create-account',
        html`
          <graficarte-store-create-account
            .missingFields=${this.signinMissingFields}
            @create-account=${this.createAccount}
            @cancel-create-account=${this.cancelCreateAccount}
            @valid-password=${this.setValidCreateAccountPassword}
            @invalid-password=${this.setInvalidCreateAccountPassword}>
          </graficarte-store-create-account>
        `
      ],
      [
        'client-store',
        this.createClientContent()
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
            .missingFields=${this.loginMissingFields}
            @graficarte-login-submit=${this.login}
            @graficarte-cancel-login=${this.cancelLogin}>
          </graficarte-store-login-page>
        `
      ],
    ];

    return this.contentCreator(this.page, templates);

  }

  createHeaderContent (){
    const templates = [ 
      [
        'client-store',
        html`
          <graficarte-store-header
            ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-store-header
            ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
      [
        'public-store',
        html`
          <graficarte-store-header
            ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
            @navigate=${this.headerNavigate}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
      [
        'login',
        html`
          <graficarte-store-header
            ?isCreateAccountAvailable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
    ];
    return this.contentCreator(this.page, templates);
  }

  createNavBarContent (){
    const templates = [
      [
        'client-store',
        html`
          <graficarte-store-client-nav-bar
            @graficarte-navigate-to-page=${this.clientNavigation}
            @finish-sesion=${this.logOut}>
          </graficarte-store-client-nav-bar>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-store-admin-nav-bar
            @finish-sesion=${this.logOut}>
          </graficarte-store-admin-nav-bar>
        `
      ],
    ];

    return this.contentCreator(this.page, templates);
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

        <sophos-simple-template
        id="app-main-template"
        page-name=${this.page}
        .styleTemplate=${this.templateStyle}
        class=${this.templateClass}>
          <div slot="header-content">
            ${this.createHeaderContent()}
          </div>
          <div slot="main-view-content">
            ${this.createMainViewContent()}
          </div>
          <div slot="nav-bar-content">
            ${this.createNavBarContent()}
          </div>
        </sophos-simple-template>
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