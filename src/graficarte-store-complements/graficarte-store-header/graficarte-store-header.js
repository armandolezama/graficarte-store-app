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
    this.headerContent = [
      [
        'client-store',
        html`
          <graficarte-header-content
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            ?isShoppingCartIconEnable=${this.isShoppingCartIconDisplayed}
            @searching-for-term=${this.searchTerm}
            @shopping-cart-page=${this.openShoppingCartPage}>
          </graficarte-header-content>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-header-content
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-header-content>
        `
      ],
      [
        'public-store',
        html`
          <graficarte-header-content
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @navigate=${this.headerNavigate}
            @searching-for-term=${this.searchTerm}>
          </graficarte-header-content>
        `
      ],
      [
        'login',
        html`
          <graficarte-header-content
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            @searching-for-term=${this.searchTerm}>
          </graficarte-header-content>
        `
      ],
    ];
    this.content = '';
  }

  static get styles () {
    return styles
  }

  searchTerm (e) {
    console.log(e.detail.term);
  }

  openShoppingCartPage () {
    this.page = 'client-store';
    this.clientContent = 'shopping-cart';
    this.isShoppingCartIconDisplayed = false;
  }

  headerNavigate (e) {
    const { page } = e.detail;
    this.page = page;
    return page === 'login' ? this.setLoginConfig() : this.setCreateAccountConfig();
  }

  contentCreator (contentTag = '', templates = [['', html``]]) {
    const contentArray = templates.map(template => {
      return contentTag === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  render () {
    return html`${this.contentCreator(this.content, this.headerContent)}`;
  }
}
customElements.define('graficarte-store-header', GraficarteStoreHeader);
