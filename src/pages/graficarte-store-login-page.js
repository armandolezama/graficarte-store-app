import { LitElement, html, css } from 'lit-element';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales/'

export class GraficarteStoreLoginPage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputList = [];
    this._email = '';
    this._password = '';
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputList: { type : Array }
    };
  };

  static get styles() {
    return css`
      #login-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 99vh;
      }

      #login-form-container{
        background: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 400px;
        height: 400px;
        border-radius: 30px;
      }
      
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: auto;
      }
    `;
  };

  setUserCredentialField(e){
    const field = e.target.getAttribute('field-name');
    field === 'email' ? this.setEmail(e.detail.value) : this.setPassword(e.detail.value);
  };

  setEmail(email) {
    this._email = email;
  };

  setPassword(password) {
    this._password = password;
  };

  manageLoginActions(e){
    const payload = e.detail;
    payload.option === 0 ? this._submit() : payload.option === 1 ? this._cancel() : payload;
  };

  _submit(){
    const userCredentials = {
      email: this._email,
      password: this._password
    };
    this.dispatchEvent(new CustomEvent('graficarte-login-submit', { detail: {userCredentials}}));
  };

  _cancel() {
    this.dispatchEvent(new CustomEvent('graficarte-cancel-login'));
  };

  render() {
    return html`
      <div id="login-container">
        <div id="login-form-container">
        ${this.inputList.map(inputData => {
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
          @sophos-input-changed="${this.setUserCredentialField}">
        </sophos-chimera-input>
        `;
      })}
          <sophos-chimera-button 
          type="simple-multi-button"
          .buttonsLabels="${['Entrar', 'Cancelar']}"
          @sophos-chimera-button-click="${this.manageLoginActions}" id="login-submit">Entrar</sophos-chimera-button>
        </div>
      </div>
    `;
  };
};
customElements.define('graficarte-store-login-page', GraficarteStoreLoginPage);