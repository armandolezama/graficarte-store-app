import { LitElement, html } from 'lit';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import 'sophos-simple-modal/sophos-simple-modal';
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
    this.signInForm = [];
    this.page = '';
    this.clientContent = '';
    this.templateStyle = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this._loginData = {};
    this._signinData = {};
    this._clientData = {};
    this.isModalOpened = false;
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = [
      {
        label: '',
        key: '',
      }
    ];
    this.userData = {
      name: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      id: '',
    };
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties () {
    return {
      inventory: { type: Array },
      storeProducts: { type: Array },
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
    };
  }

  static get styles () {
    return styles;
  }

  firstUpdated () {
    super.firstUpdated();
    this.showPublicStore();
  }

  showPublicStore () {
    this.page = 'public-store';
    this.templateStyle = 'full-header';
    this.isCreateAccountOptionDisplayed = true;
    this.isShoppingCartIconDisplayed = false;
    this.templateClass = 'public-store-container';
  }

  login (e) {
    this._loginData = e.detail.userCredentials;
  }

  cancelLogin () {
    this._loginData = {};
    this.showPublicStore();
  }

  openLogoutModal () {
    this.setLogoutModal();
    this.openModal();
  }

  setLogoutModal () {
    this.modalTitle = '¿Desea salir de la sesión?';
    this.modalMessage = 'Presione "Continuar si desea quedarse, o presione "Salir" para terminar su sesión"';
    this.modalLabelsButtons = [
      {
        label: 'Continuar',
        key: 'close-modal',
      },
      {
        label: 'Salir',
        key: 'close-session',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setLoginErrorModal (error) {

    this.modalTitle = `${error.info}`;
    this.modalMessage = `${error.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setSigninErrorModal (error) {

    this.modalTitle = `${error.info}`;
    this.modalMessage = `${error.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setApiServerErrorModal () {
    this.modalTitle = 'Error en el servidor';
    this.modalMessage = 'Algo ha fallado con el servidor, por favor, inténtelo más tarde.';
    this.modalLabelsButtons = [
      {
        label: 'Continuar',
        key: 'close-api-error-modal',
      }
    ];
    this.modalFooterMessage = 'Graficarte';
    this.openModal();
  }

  manageModalOptions (e) {
    const option = e.detail.buttonDescription.key;
    if (option === 'close-modal') {
      this.closeModal();
    } else if (option === 'back-to-login') {
      this.closeModal();
    } else if(option === 'close-api-error-modal'){
      this._loginData = {};
      this.closeModal();
    } else {
      this.showPublicStore();
      this.closeModal();
    }
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

  setProgressState () {
    console.log('this shit is in progress');
  }

  errorSignIn () {
    this.setApiServerErrorModal();
  }

  errorLogin () {
    this.setApiServerErrorModal();
  }

  headerNavigate (e) {
    const { page } = e.detail;
    this.page = page;
    return page === 'login' ? this.setLoginConfig() : this.setCreateAccountConfig();
  }

  openShoppingCartPage () {
    this.page = 'client-store';
    this.clientContent = 'shopping-cart';
    this.isShoppingCartIconDisplayed = false;
  }

  searchTerm (e) {
    console.log(e.detail.term);
  }

  clientNavigation (e) {
    const clientPage = e.detail.page;
    this.clientContent = clientPage;
    this.isShoppingCartIconDisplayed = true;
  }

  contentCreator (contentController = '', templates = [['', html``]]) {
    const contentArray = templates.map(template => {
      return contentController === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  createClientContent () {
    const templates = [
      [
        'home',
        html`
          <graficarte-store-home-page .products=${this.storeProducts}>
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

  createMainViewContent () {
    const templates = [
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
          @graficarte-login-submit=${this.login}
          @graficarte-cancel-login=${this.cancelLogin}>
          </graficarte-store-login-page>
        `
      ],
    ];

    return this.contentCreator(this.page, templates);

  }

  createHeaderContent () {
    const templates = [
      [
        'client-store',
        html`
          <graficarte-store-header
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            ?isShoppingCartIconEnable=${this.isShoppingCartIconDisplayed}
            @searching-for-term=${this.searchTerm}
            @shopping-cart-page=${this.openShoppingCartPage}>
          </graficarte-store-header>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-store-header
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
      [
        'public-store',
        html`
          <graficarte-store-header
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @navigate=${this.headerNavigate}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
      [
        'login',
        html`
          <graficarte-store-header
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-store-header>
        `
      ],
    ];
    return this.contentCreator(this.page, templates);
  }

  openModal () {
    this.isModalOpened = true;
  }

  closeModal () {
    this.isModalOpened = false;
  }

  createNavBarContent () {
    const templates = [
      [
        'client-store',
        html`
          <graficarte-store-client-nav-bar
            .name=${this.userData.name}
            .lastName=${this.userData.lastName}
            @graficarte-navigate-to-page=${this.clientNavigation}
            @finish-sesion=${this.openLogoutModal}>
          </graficarte-store-client-nav-bar>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-store-admin-nav-bar
            @finish-sesion=${this.openLogoutModal}>
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
        @request-is-done=${this.successLoginRequest}
        @request-failed=${this.errorLogin} 
        @request-in-progress=${this.setProgressState}>
        </graficarte-store-login-controller>
      
        <graficarte-store-sign-in-controller 
        .name=${this._signinData.name} 
        .lastName=${this._signinData.lastName}
        .phoneNumber=${this._signinData.phoneNumber} 
        .email=${this._signinData.email} 
        .address=${this._signinData.address}
        .password=${this._signinData.password} 
        ?isPasswordValid=${this.isValidCreateAccountPassword}
        @request-is-done=${this.successSignIn}
        @request-failed=${this.errorSignIn} 
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
      
        <sophos-simple-modal
          modalStyle="full-screen"
          ?isModalOpened=${this.isModalOpened}
          .modalTitle=${this.modalTitle}
          .modalMessage=${this.modalMessage}
          .modalFooterMessage=${this.modalFooterMessage}>
      
          <sophos-chimera-button
            slot="modal-body"
            type="simple-multi-button"
            .buttonsLabels=${this.modalLabelsButtons}
            @sophos-chimera-button-click=${this.manageModalOptions}>
          </sophos-chimera-button>
      
        </sophos-simple-modal>
      
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