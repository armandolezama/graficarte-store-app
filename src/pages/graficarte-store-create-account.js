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
  constructor () {
    super();
    this.inputsList = [];
    this.buttonLabels = [
      {
        label: getLocal('graficarte-store-create-account-form-create-account'),
        key: 'create-account',
      },
      {
        label: getLocal('graficarte-store-create-account-form-cancel'),
        key: 'cancel',
      },
    ];
    this.userData = {};
    this.passwordMessageStyle = '';
    this.emptyMessage = 'Este campo es requerido';
    this._handlers = {};
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputsList : { type : Array },
      userData : { type : Object },
      passwordMessageStyle : { type : String },
      passwordMessageText : { type : String },
      _handlers : { type : Object}
    };
  }

  static get styles () {
    return css`
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: auto;
        --sophos-chimera-input-input-container-input-style-simple-bar-input-margin-bottom: 40px;
      }

      #password-message-container[message-style="password-message-success"] {
        background-color: #73db46;
      }

      #password-message-container[message-style="password-message-error"] {
        background-color: #ff1e00;
      }

      #password-message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        margin: 0 0 30px 0;
        border-radius: 20px;
        opacity: 0.8;
      }

      #password-message {
        font-size: 1rem;
        font-family: monospace;
        font-weight: bold;
      }
      
      #password-message[message="success"] {
        color: #000;
      }

      #password-message[message="error"] {
        color: #fff;
      }
    `;
  }

  firstUpdated (){
    super.firstUpdated();
    this._handlers = {
      'set data' : this.setUserDataField,
      'confirm pass' : this.confirmPassword
    };
  }

  showForm (){
    return this.inputsList.map(inputData => {
      return html`
      <sophos-chimera-input
        field-name=${inputData.fieldName}
        .styleOfInput=${inputData.styleOfInput}
        .maxLength=${inputData.maxLength}
        .label=${inputData.label}
        .type=${inputData.type}
        .isRequired=${inputData.isRequired}
        .showMessage=${inputData.missingField}
        .emptyMessage=${this.emptyMessage}
        @sophos-input-changed=${this._handlers[inputData.handler]}>
      </sophos-chimera-input>
      `;
    });
  }

  manageCreateAccountActions (e){
    const { key } = e.detail.buttonDescription;
    if(key === 'create-account') {
      this.createAccount();
    } else {
      this.cancel();
    }
  }

  createAccount () {
    this.dispatchEvent(new CustomEvent('create-account', {
      detail : { userData: {...this.userData} }
    }));
  }

  cancel () {
    this.dispatchEvent(new CustomEvent('cancel-create-account'));
  }


  setUserDataField (e) {
    this.userData[e.target.getAttribute('field-name')] = e.detail.value;
  }

  confirmPassword (e) {
    if(this.userData.password && e.detail.value === this.userData.password) {
      this._showPasswordSuccessMessage();
    } else {
      this._showPasswordErrorMessage();
    }
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
    <div>
      ${this.showForm()}
      <div id=password-message-container message-style=password-message-${this.passwordMessageStyle}>
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