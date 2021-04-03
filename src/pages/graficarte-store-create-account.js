import { LitElement, html, css } from 'lit-element';
import 'sophos-chimera-input/sophos-chimera-input'

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputs = [];
    this.userData = {};
    this.passwordMessageStyle = '';
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputs : { type : Array },
      userData : { type : Object },
      passwordMessageStyle : { type : String },
      passwordMessageText : { type : String }
    };
  };

  static get styles() {
    return css`
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: auto;
      }
    `;
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
      this.showSuccessMessage();
    } else {
      this.showErrorMessage();
    };
  };

  showErrorMessage() {
    this.passwordMessageStyle = 'error';
    this.passwordMessageText = 'Las contraseñas no coinciden'
  }

  showSuccessMessage() {
    this.passwordMessageStyle = 'success';
    this.passwordMessageText = 'Las contraseñas coinciden';
  }

  render() {
    return html`
    <div>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Nombre(s)'}"
      .type="${'text'}"
      .isRequired="${true}"
      field-name="name"
      @sophos-input-changed="${this.setUserDataField}">
      </sophos-chimera-input>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Apellidos'}"
      .type="${'text'}"
      .isRequired="${true}"
      field-name="last-name"
      @sophos-input-changed="${this.setUserDataField}">
      </sophos-chimera-input>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Correo electrónico'}"
      .type="${'email'}"
      .isRequired="${true}"
      field-name="email"
      @sophos-input-changed="${this.setUserDataField}">
      </sophos-chimera-input>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Dirección'}"
      .type="${'text'}"
      .isRequired="${true}"
      field-name="address"
      @sophos-input-changed="${this.setUserDataField}">
      </sophos-chimera-input>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Contraseña'}"
      .type="${'password'}"
      .isRequired="${true}"
      field-name="password"
      @sophos-input-changed="${this.setUserDataField}">
      </sophos-chimera-input>
      <sophos-chimera-input
      .styleOfInput="${'simple-bar-input'}"
      .maxLength="${30}"
      .label="${'Repita la contraseña'}"
      .type="${'password'}"
      .isRequired="${true}"
      @sophos-input-changed="${this.confirmPassword}">
      </sophos-chimera-input>
      <div messageStyle="${this.passwordMessageStyle}">
        <p>
          ${this.passwordMessageText}
        </p>
      </div>
      <button
      @click="${this.createAccount}">Crear cuenta</button>
      <button
      @click="${this.cancel}">Cancelar</button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);