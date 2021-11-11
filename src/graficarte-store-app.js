import { LitElement, html } from 'lit-element';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import './pages/graficarte-store-inventory-page'
import './pages/graficarte-store-home-page';
import './pages/graficarte-store-login-page';
import './pages/graficarte-store-create-account';
import './complements/graficarte-store-admin-nav-bar';
import './complements/graficarte-store-client-nav-bar';
import './complements/graficarte-store-header';
import './controllers/graficarte-store-login-controller';
import './controllers/graficarte-store-sign-in-controller';
import productMocks from './mocks/products-mocks';
import inventoryMocks from './mocks/inventory-mocks';
import getLocal from './locales';
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
    this.createAccountForm = [
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'name',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-last-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'lastName',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-email-placeholder'),
        type: 'email',
        isRequired: true,
        fieldName: 'email',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-address-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'address',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'password',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-repeat-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'confirm-password',
        handler: 'confirm pass',
        missingField: false
      },
    ];
    this.page = 'public-store';
    this.showCreateAccountMissingFieldsMessages = false;
    this.isValidCreateAccountPassword = false;
    this._loginData = {};
    this._signinData = {};
  };

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      inventory : { type : Array },
      storeProducts : { type : Array },
      page : { type : String},
      showCreateAccountMissingFieldsMessages: { type : Boolean},
      _loginData : { type : Object},
      _signinData : { type : Object}
    };
  }

  static get styles() {
    return styles;
  };

  firstUpdated(){
    super.firstUpdated();
    this.setCreateAccountFieldsNames();
  };

  login(e) {
    this._loginData = {...e.detail.userCredentials};
  };

  cancelLogin(){
    this.page = 'public-store';
  };

  logOut() {
    this.page = 'public-store';
  };

  createAccount(e) {
    this.showCreateAccountMissingFieldsMessages = true;
    this._signinData = {...e.detail.userData};
  };

  cancelCreateAccount() {
    this.showCreateAccountMissingFieldsMessages = false;
    this.restartCreateAccountMissingFields();
    this.page = 'public-store';
  };
  setValidCreateAccountPassword(){
    this.isValidCreateAccountPassword = true;
  };

  setInvalidCreateAccountPassword(){
    this.isValidCreateAccountPassword = false;
  };

  setCreateAccountFieldsNames(){
    for (const input of this.createAccountForm) {
      this._signinData[input.fieldName] = '';
    };
  };

  setCreateAccountMissingFields(e){
    if (this.showCreateAccountMissingFieldsMessages) {
      const { emptyFields } = e.detail;
      this.createAccountForm = this.createAccountForm.map(input => {
        if (emptyFields.includes(input.fieldName)){
          input.missingField = true;
        } else {
          input.missingField = false;
        };
        return input;
      });
    };
    this.requestUpdate();
  };

  restartCreateAccountMissingFields(){
    this.createAccountForm = this.createAccountForm.map(input => {
      input.missingField = false;
      return input;
    });
  };

  setAllCreateAccountMissingFields(){
    this.createAccountForm = this.createAccountForm.map(input => {
      input.missingField = true;
      return input;
    });
  };

  loginMissingFields(e){

  };

  successSignIn(){
    this.page = 'client-store';
  };

  successLogin(){
    this.page = 'client-store';
  };

  errorSignIn(){
    alert('error at signin');
  };

  errorLogin(){
    alert('error at login');
  };

  showLoginPage(){
    this.page = 'login';
  };

  showCreateAccountPage(){
    this.page = 'create-account';
  };

  searchTerm(e){
    console.log(e.detail.term);
  };

  render() {
    return html`
      <div id="main-app-container">
        
        <graficarte-store-login-controller
        .email="${this._loginData.email}"
        .password="${this._loginData.password}"
        @graficarte-store-login-missing-fields="${this.loginMissingFields}"
        @graficarte-store-login-succes="${this.successLogin}"
        @graficarte-store-login-error="${this.errorLogin}"
        >
        </graficarte-store-login-controller>

        <graficarte-store-sign-in-controller
          .name = "${this._signinData.name}"
          .lastName = "${this._signinData.lastName}"
          .email = "${this._signinData.email}"
          .address = "${this._signinData.address}"
          .password = "${this._signinData.password}"
          .isPasswordValid = "${this.isValidCreateAccountPassword}"
          @graficarte-store-sign-in-success = "${this.successSignIn}"
          @graficarte-store-sign-in-error = "${this.errorSignIn}"
          @graficarte-store-create-account-missing-fields = "${this.setCreateAccountMissingFields}">
        </graficarte-store-sign-in-controller>

      ${this.page === 'create-account' ? html`

        <sophos-simple-template 
          id="create-account-container"
          page-name="${this.page}"
          styleTemplate="full-header">

          <graficarte-store-create-account
          .inputsList="${this.createAccountForm}"
          @create-account="${this.createAccount}"
          @cancel-create-account="${this.cancelCreateAccount}"
          @graficarte-store-create-account-valid-password="${this.setValidCreateAccountPassword}"
          @graficarte-store-create-account-invalid-password="${this.setInvalidCreateAccountPassword}"
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

            <graficarte-store-inventory-page 
              .products="${this.inventory}" 
              slot="main-view-content">
            </graficarte-store-inventory-page>

            <graficarte-store-admin-nav-bar
            @finish-sesion="${this.logOut}"
              slot="nav-bar-content">
            </graficarte-store-admin-nav-bar>

          </sophos-simple-template>
    
        ` : html``}
        ${this.page === 'public-store' ? html`

          <sophos-simple-template 
            id="public-store-container"
            page-name="${this.page}"
            styleTemplate = "full-header">

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

          <graficarte-store-login-page
           @graficarte-login-submit="${this.login}"
           @graficarte-cancel-login="${this.cancelLogin}">
           </graficarte-store-login-page>

    ` : html``}
      </div>
  `;
  };
};
customElements.define('graficarte-store-app', GraficarteStoreApp);