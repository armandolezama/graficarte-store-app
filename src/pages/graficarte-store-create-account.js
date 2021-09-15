import { LitElement, html, css } from 'lit-element';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales/'

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputsList = [
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'name',
        handler: 'set data'
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-last-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'last-name',
        handler: 'set data'
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-email-placeholder'),
        type: 'email',
        isRequired: true,
        fieldName: 'email',
        handler: 'set data'
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-address-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'address',
        handler: 'set data'
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'password',
        handler: 'set data'
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-repeat-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: '',
        handler: 'confirm pass'
      },
    ];
    this.buttonLabels = [
      getLocal('graficarte-store-create-account-form-create-account'), 
      getLocal('graficarte-store-create-account-form-cancel')];
    this.userData = {};
    this.passwordMessageStyle = '';
    this._handlers = {};
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputsList : { type : Array },
      userData : { type : Object },
      passwordMessageStyle : { type : String },
      passwordMessageText : { type : String },
      _handlers : { type : Object}
    };
  };

  static get styles() {
    return css`
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: auto;
      }
    `;
  };

  firstUpdated(){
    this._handlers = {
      'set data' : this._setUserDataField,
      'confirm pass' : this._confirmPassword
    };
  };

  _manageCreateAccountActions(e){
    const payload = e.detail;
    payload.option === 0 ? this._createAccount() : payload.option === 1 ? this._cancel() : payload;
  }

  _createAccount() {
    this.dispatchEvent(new CustomEvent('create-account', {
      detail : { userData: this.userData }
    }));
  };

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel-create-account'));
  };


  _setUserDataField(e) {
    this.userData[e.target.getAttribute('field-name')] = e.detail.value;
  };

  _confirmPassword(e) {
    if(this.userData.password && e.detail.value === this.userData.password) {
      this._showSuccessMessage();
    } else {
      this._showErrorMessage();
    };
  };

  _showErrorMessage() {
    this.passwordMessageStyle = 'error';
    this.passwordMessageText = 'Las contraseñas no coinciden'
  }

  _showSuccessMessage() {
    this.passwordMessageStyle = 'success';
    this.passwordMessageText = 'Las contraseñas coinciden';
  }

  render() {
    return html`
    <div>
      ${this.inputsList.map(inputData => {
        return html`
        <sophos-chimera-input
          .styleOfInput="${inputData.styleOfInput}"
          .maxLength="${inputData.maxLength}"
          .label="${inputData.label}"
          .type="${inputData.type}"
          field-name="${inputData.fieldName}"
          .isRequired="${inputData.isRequired}"
          @sophos-input-changed="${this._handlers[inputData.handler]}">
        </sophos-chimera-input>`;
      })}
      <div messageStyle="password-message-${this.passwordMessageStyle}">
        <p>
          ${this.passwordMessageText}
        </p>
      </div>
      <sophos-chimera-button
      type="neon-multi-button"
      .buttonsLabels="${this.buttonLabels}"
      @sophos-chimera-button-click="${this._manageCreateAccountActions}"></sophos-chimera-button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);