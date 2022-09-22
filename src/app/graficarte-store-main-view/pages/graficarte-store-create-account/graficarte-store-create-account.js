import { LitElement, html } from 'lit';
import styles from './graficarte-store-create-account-styles';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import './graficarte-create-account-form/graficarte-create-account-form';
import getLocal from '../../../../utils/locales';

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.buttonLabels = [
      {
        label: getLocal('graficarte-store-create-account-form-create-account'),
        key: 'create-account',
      },
      {
        label: getLocal('graficarte-store-create-account-form-cancel'),
        key: 'cancel-create-account',
      },
    ];
    this.userData = {};
    this.missingFields = [];
    this.passwordMessageStyle = '';
    this.passwordMessageText = '';
    this.isPasswordValid = false;
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      userData : { type : Object },
      missingFields : { type : Array },
      passwordMessageStyle : { type : String },
      passwordMessageText : { type : String },
    };
  }

  static get styles () {
    return styles;
  }

  manageCreateAccountActions (e){
    const { key } = e.detail.buttonDescription;
    const payload = {
      buttonKey: key,
      userData: {
        name: this.name,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        address: this.address,
        password: this.password
      },
    };
    this.dispatchEvent(new CustomEvent(`graficarte-${payload.buttonKey}`, {
      detail: payload,
    }))
  }

  _showPasswordErrorMessage () {
    this.passwordMessageStyle = 'error';
    this.passwordMessageText = 'Las contraseñas no coinciden'
    this.dispatchEvent(new CustomEvent('invalid-password'));
  }

  _showPasswordSuccessMessage () {
    this.passwordMessageStyle = 'success';
    this.passwordMessageText = 'Las contraseñas coinciden';
    this.dispatchEvent(new CustomEvent('valid-password'));
  }

  render () {
    return html`
    <div id="main-container">
      <graficarte-create-account-form
      .missingFields=${this.missingFields}>
      </graficarte-create-account-form>

      <div id=password-message-container message-style=${`password-message-${this.passwordMessageStyle}`}>
        <p id=password-message message=${this.passwordMessageStyle}>
          ${this.passwordMessageText}
        </p>
      </div>

      <sophos-chimera-button
      type=simple-multi-button
      .buttonsLabels=${this.buttonLabels}
      @sophos-chimera-button-click=${this.manageCreateAccountActions}></sophos-chimera-button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);
