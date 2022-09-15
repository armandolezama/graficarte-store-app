import { LitElement, html } from 'lit';
import styles from './graficarte-header-content-styles'
import getLocal from '../../../locales';
import 'sophos-chimera-button/sophos-chimera-button';
import 'sophos-icon/sophos-icon';

export class GraficarteHeaderContent extends LitElement {

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
    return styles;
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
customElements.define('graficarte-header-content', GraficarteHeaderContent);
