import { LitElement, html } from 'lit';
import styles from './graficarte-store-header-styles';
import './graficarte-header-content/graficarte-header-content';

export class GraficarteStoreHeader extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.content = '';
    this.isCreateAccountEnable = false;
    this.isShoppingCartIconEnable = false;
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      content: { type : String },
      isShoppingCartIconDisplayed: { type: Boolean },
      isCreateAccountEnable:  { type: Boolean },
    };
  }

  static get styles () {
    return styles
  }

  openShoppingCartPage () {
    this.dispatchEvent(new CustomEvent('open-shopping-cart-page'));
  }

  searchTerm (e) {
    const { detail } = e;

    this.dispatchEvent(new CustomEvent('searching-for-term', {
      detail
    }))
  }

  headerNavigate (e) {
    const { page } = e.detail;
    this.dispatchEvent(new CustomEvent('header-page-change', {
      detail: page,
    }));
  }

  render () {
    return html`
          <graficarte-header-content
            ?isCreateAccountEnable=${this.isCreateAccountEnable}
            ?isShoppingCartIconEnable=${this.isShoppingCartIconDisplayed}
            @navigate=${this.headerNavigate}
            @searching-for-term=${this.searchTerm}
            @shopping-cart-page=${this.openShoppingCartPage}>
          </graficarte-header-content>
      `;
  }
}
customElements.define('graficarte-store-header', GraficarteStoreHeader);
