import { LitElement, html, css } from 'lit-element';

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
        height: 100px;
        display: flex;
        margin: 20px;
      }

      #input-container[show-create-account-button] {
        width: 80%;
      }

      #input-container {
        width: 100%;
      }

      #search-bar-input {
      padding: 20px;
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

      #create-account-container {
        justify-content: flex-end;
        display: inline-flex;
        width: 20%
      }

      #create-account-button,
      #sign-in-button {
        display: inline-flex;
        height: 35px;
        width: 100px;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    `;
  };

  createAccountEvent() {
    this.dispatchEvent(new CustomEvent('create-new-account'))
  };

  login() {
    this.dispatchEvent(new CustomEvent('sign-in'))
  }

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
            placeholder="buscar" 
            @input="${this.searchProduct}">
        </div>

        ${this.isCreateAccountAvailable ? html`
          <div id="create-account-container">
            <button
            id="create-account-button"
            @click="${this.createAccountEvent}">Crear cuenta</button>
            <button
            id="sign-in-button"
            @click="${this.login}">Iniciar sesión</button>
          </div>
        ` : html``}

      </div>
    `;
  };
};
customElements.define('graficarte-store-header', GraficarteStoreHeader);