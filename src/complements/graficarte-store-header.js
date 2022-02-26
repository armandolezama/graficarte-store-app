import { LitElement, html, css } from 'lit';
import 'sophos-chimera-button/sophos-chimera-button';
import 'sophos-icon/sophos-icon';
import getLocal from '../locales/';

export class GraficarteStoreHeader extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.isCreateAccountEnable = false;
    this.isShoppingCartIconEnable = false;
    this.headerOptions = [
      {
        label: 'Crear cuenta',
        key: 'create-account',
      },
      {
        label: 'Iniciar sesión',
        key: 'login',
      },
    ];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      isCreateAccountEnable : { type : Boolean},
      isShoppingCartIconEnable : { type : Boolean},
    };
  }

  static get styles () {
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
        --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin: 0 0 12px;
        --sophos-chimera-button-flex-direction: column;
        --sophos-chimera-button-flex-flow: column;
      }

      #shopping-cart-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      sophos-icon {
        margin: 5px;
        box-sizing: border-box;
        --sophos-icon-icon-image-margin: 15px 5px 5px 5px;
        --sophos-icon-icon-image-border-radius: 50%;
        --sophos-icon-icon-image-box-sizing: border-box;
        --sophos-icon-icon-text-margin: 5px 0 5px 0;
      }

      sophos-icon:hover {
        --sophos-icon-icon-image-border: 2px solid;
        --sophos-icon-icon-image-border-radius: 50%;
        --sophos-icon-icon-text-margin: 5px 0 5px 0;
        --sophos-icon-icon-text-color: #000000;
      }

      sophos-icon:active {
        border: 2px dotted;
        border-radius: 10px;
      }
    `;
  }

  _createAccountEvent () {
    this.dispatchEvent(new CustomEvent('create-new-account'));
  }

  _loginEvent () {
    this.dispatchEvent(new CustomEvent('sign-in'));
  }

  _navigate (e){
    const page = e.detail.buttonDescription.key;
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page }
    }));
  }

  _setShoppingCartPage (){
    this.dispatchEvent(new CustomEvent('shopping-cart-page'));
  }

  searchProduct (e) {
    this.dispatchEvent(new CustomEvent('searching-for-term', {detail : {
      term : e.target.value}}));
  }

  render () {
    return html`
      <div 
        id="search-bar">
        <div id="input-container"
        ?show-create-account-button=${this.isCreateAccountEnable}>
          <input 
            id="search-bar-input" 
            type="text" name="search-bar" 
            .placeholder=${getLocal('graficarte-store-search-bar-place-holder')}
            @input=${this.searchProduct}>
        </div>

        ${this.isCreateAccountEnable ? html`
          <div id="session-manager-container">
            <sophos-chimera-button
            id="session-multi-button"
            type="simple-multi-button"
            .buttonsLabels=${this.headerOptions}
            @sophos-chimera-button-click=${this._navigate}></sophos-chimera-button>
          </div>
        ` : html``}

        ${this.isShoppingCartIconEnable ? html`
          <div id="shopping-cart-container">
            <sophos-icon
            .iconText=${'Carrito'}
            .imageSource=${'./assets/shopping-cart.png'}
            .imageAlt=${'shopping-cart'}
            .iconDirection=${'top'}
            @click=${this._setShoppingCartPage}>
            </sophos-icon>
          </div>
        ` : html``}

      </div>
    `;
  }
}
customElements.define('graficarte-store-header', GraficarteStoreHeader);

/**
 * TOD-DO: add shopping cart button
 */