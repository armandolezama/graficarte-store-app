import { LitElement, html } from 'lit';
import styles from './graficarte-store-side-bar-styles';

export class GraficarteStoreSideBar extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.sideBarContent = [
      [
        'client-store',
        html`
          <graficarte-store-client-nav-bar
            .name=${this.userData.name}
            .lastName=${this.userData.lastName}
            @graficarte-navigate-to-page=${this.clientNavigation}
            @finish-sesion=${this.openLogoutModal}>
          </graficarte-store-client-nav-bar>
        `
      ],
      [
        'inventory',
        html`
          <graficarte-store-admin-nav-bar
            @finish-sesion=${this.openLogoutModal}>
          </graficarte-store-admin-nav-bar>
        `
      ],
    ];
    this.content = '';
  }

  static get styles () {
    return styles
  }

  clientNavigation (e) {
    const clientPage = e.detail.page;
    this.clientContent = clientPage;
    this.isShoppingCartIconDisplayed = true;
  }

  openLogoutModal () {
    this.setLogoutModal();
    this.openModal();
  }

  contentCreator (contentTag = '', templates = [['', html``]]) {
    const contentArray = templates.map(template => {
      return contentTag === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  render() {
    return html`${this.contentCreator(this.content, this.sideBarContent)}`;
  }
}
customElements.define('graficarte-store-side-bar', GraficarteStoreSideBar);
