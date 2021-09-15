import { LitElement, html, css } from 'lit-element';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales/';

export class GraficarteStoreHeader extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.isCreateAccountAvailable = false;
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      isCreateAccountAvailable : { type : Boolean}
    };
  };

  static get styles() {
    return css`
      #search-bar {
        background: rgb(147,199,237);
        background: linear-gradient(69deg, rgba(147,199,237,1) 0%, rgba(35,132,240,1) 30%, rgba(30,97,238,1) 65%, rgba(30,204,236,0.9304096638655462) 100%);
        height: 100px;
        display: flex;
        margin: 20px;
        padding: 0 20px;
        border-radius: 30px;
      }

      #input-container[show-create-account-button] {
        align-items: center;
        width: 80%;
        display: flex;
      }

      #input-container {
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
      }

      #search-bar-input {
      padding: 20px;
      margin: 20px;
      width: 100%;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      background-color: white;
      background-image: url('assets/search-icon.png');
      background-position: 10px 10px; 
      background-repeat: no-repeat;
      background-size: 20px 20px;
      padding: 12px 20px 12px 40px;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
      }

      #session-manager-container {
        display: inline-flex;
        justify-content: space-around;
        width: 20%;
        flex-direction: column;
        align-items: baseline;
      }

      sophos-chimera-button {
        --sophos-chimera-button-font-size: .8rem;
        --sophos-chimera-button-height: 30px;
        --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin-bottom: 12px;
        --sophos-chimera-button-flex-direction: column;
        --sophos-chimera-button-flex-flow: column;
      }
    `;
  };

  _createAccountEvent() {
    this.dispatchEvent(new CustomEvent('create-new-account'))
  };

  _loginEvent() {
    this.dispatchEvent(new CustomEvent('sign-in'))
  }

  _manageSessionOptions(e){
    const payload = e.detail;
    payload.option === 0 ? this._createAccountEvent() : payload.option === 1 ? this._loginEvent() : payload;
  };

  searchProduct (e) {
    this.dispatchEvent(new CustomEvent('searching-for-term', {detail : {
      term : e.target.value}}));
  };

  render() {
    return html`
      <div 
        id="search-bar">
        <div id="input-container"
        ?show-create-account-button="${this.isCreateAccountAvailable}">
          <input 
            id="search-bar-input" 
            type="text" name="search-bar" 
            .placeholder="${getLocal('graficarte-store-search-bar-place-holder')}"
            @input="${this.searchProduct}">
        </div>

        ${this.isCreateAccountAvailable ? html`
          <div id="session-manager-container">
            <sophos-chimera-button
            id="session-multi-button"
            type="simple-multi-button"
            .buttonsLabels="${['Crear cuenta', 'Iniciar sesión']}"
            @sophos-chimera-button-click="${this._manageSessionOptions}"></sophos-chimera-button>
          </div>
        ` : html``}

      </div>
    `;
  };
};
customElements.define('graficarte-store-header', GraficarteStoreHeader);