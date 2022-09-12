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
    `;
  }
}
customElements.define('graficarte-store-main-view', GraficarteStoreMainView);
