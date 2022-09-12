import { LitElement, html } from 'lit';
import './graficarte-store-create-account/graficarte-store-create-account';
import './graficarte-store-error-page/graficarte-store-error-page';
import './graficarte-store-home-page/graficarte-store-home-page';
import './graficarte-store-inventory-page/graficarte-store-inventory-page';
import './graficarte-store-login-page/graficarte-store-login-page';
import './graficarte-store-notifications/graficarte-store-notifications';
import './graficarte-store-payment-methods/graficarte-store-payment-methods';
import './graficarte-store-profile/graficarte-store-profile';
import './graficarte-store-profile-configuration/graficarte-store-profile-configuration';
import './graficarte-store-shopping-cart/graficarte-store-shopping-cart';
import './graficarte-store-shopping-history/graficarte-store-shopping-history';

export class GraficarteStorePageRouter extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inventory = inventoryMocks;
      this.storeProducts = productMocks;
      this.shownBuyingOptions = false;
      this.mainViewContent = [
        [
          'create-account',
          html`
            <graficarte-store-create-account
              @create-account=${this.createAccount}
              @cancel-create-account=${this.cancelCreateAccount}
              @valid-password=${this.setValidCreateAccountPassword}
              @invalid-password=${this.setInvalidCreateAccountPassword}>
            </graficarte-store-create-account>
          `
        ],
        [
          'client-store',
          this.contentCreator(this.clientPage, this.clientContent)
        ],
        [
          'inventory',
          html`
            <graficarte-store-inventory-page 
            .products=${this.inventory}>
            </graficarte-store-inventory-page>
          `
        ],
        [
          'public-store',
          html`
            <graficarte-store-home-page 
            .products=${this.storeProducts}>
            </graficarte-store-home-page>
          `
        ],
        [
          'login',
          html`
            <graficarte-store-login-page
            @graficarte-login-submit=${this.login}
            @graficarte-cancel-login=${this.cancelLogin}>
            </graficarte-store-login-page>
          `
        ],
      ];
      this.clientContent = [
        [
          'home',
          html`
            <graficarte-store-home-page 
            .products=${this.storeProducts}
            .shownBuyingOptions=${this.shownBuyingOptions}
            @add-product-to-cart=${this.addProductToCart}
            @buy-product=${this.buyProduct}>
            </graficarte-store-home-page>
          `
        ],
        [
          'profile',
          html`
            <graficarte-store-profile
            .userData=${this.userData}
            @graficarte-store-profile-has-changed=${this.updateUserData}>
            </graficarte-store-profile>
          `
        ],
        [
          'profile-config',
          html`
            <graficarte-store-profile-configuration>
            </graficarte-store-profile-configuration>
          `
        ],
        [
          'shopping-history',
          html`
            <graficarte-store-shopping-history>
            </graficarte-store-shopping-history>
          `
        ],
        [
          'notifications',
          html`
            <graficarte-store-notifications>
            </graficarte-store-notifications>
          `
        ],
        [
          'payment-methods',
          html`
            <graficarte-store-payment-methods>
            </graficarte-store-payment-methods>
          `
        ],
        [
          'error',
          html`
            <graficarte-store-error-page>
            </graficarte-store-error-page>
          `,
        ],
        [
          'shopping-cart',
          html`
            <graficarte-store-shopping-cart>
            </graficarte-store-shopping-cart>
          `
        ],
      ];
  }

  contentCreator (contentTag = '', templates = [['', html``]]) {
    const contentArray = templates.map(template => {
      return contentTag === template[0] && template[1];
    });

    return contentArray.filter(template => template);
  }

  render() {
    return html`${this.contentCreator(this.page, this.mainViewContent)}`;
  }
}
customElements.define('graficarte-store-page-router', GraficarteStorePageRouter);
