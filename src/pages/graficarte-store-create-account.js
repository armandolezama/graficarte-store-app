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
    this.inputsList = [];
    this.buttonLabels = [
      getLocal('graficarte-store-create-account-form-create-account'), 
      getLocal('graficarte-store-create-account-form-cancel')];
    this.userData = {};
    this.passwordMessageStyle = '';
    this.emptyMessage = 'Este campo es requerido';
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
    super.firstUpdated();
    this._handlers = {
      'set data' : this.setUserDataField,
      'confirm pass' : this.confirmPassword
    };
  };

  manageCreateAccountActions(e){
    const payload = e.detail;
    payload.option === 0 ? this.createAccount() : payload.option === 1 ? this.cancel() : payload;
  };

  createAccount() {
    this.dispatchEvent(new CustomEvent('create-account', {
      detail : { userData: this.userData }
    }));
  };

  cancel() {
    this.dispatchEvent(new CustomEvent('cancel-create-account'));
  };


  setUserDataField(e) {
    this.userData[e.target.getAttribute('field-name')] = e.detail.value;
  };

  confirmPassword(e) {
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
          field-name="${inputData.fieldName}"
          .styleOfInput="${inputData.styleOfInput}"
          .maxLength="${inputData.maxLength}"
          .label="${inputData.label}"
          .type="${inputData.type}"
          .isRequired="${inputData.isRequired}"
          .showMessage="${inputData.missingField}"
          .emptyMessage="${this.emptyMessage}"
          @sophos-input-changed="${this._handlers[inputData.handler]}">
        </sophos-chimera-input>
        `;
      })}
      <div messageStyle="password-message-${this.passwordMessageStyle}">
        <p>
          ${this.passwordMessageText}
        </p>
      </div>
      <sophos-chimera-button
      type="simple-multi-button"
      .buttonsLabels="${this.buttonLabels}"
      @sophos-chimera-button-click="${this.manageCreateAccountActions}"></sophos-chimera-button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);