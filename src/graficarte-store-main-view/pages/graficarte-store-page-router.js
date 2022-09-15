import { LitElement, html } from 'lit';
import './graficarte-store-create-account/graficarte-store-create-account';
import './graficarte-store-error-page/graficarte-store-error-page';
import './graficarte-store-home-page/graficarte-store-home-page';
import './graficarte-store-login-page/graficarte-store-login-page';
import './graficarte-store-notifications/graficarte-store-notifications';
import './graficarte-store-payment-methods/graficarte-store-payment-methods';
import './graficarte-store-profile/graficarte-store-profile';
import './graficarte-store-profile-configuration/graficarte-store-profile-configuration';
import './graficarte-store-shopping-cart/graficarte-store-shopping-cart';
import './graficarte-store-shopping-history/graficarte-store-shopping-history';
import productMocks from '../../mocks/products-mocks';

export class GraficarteStorePageRouter extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.storeProducts = productMocks;
    this.mainPage = '';
    this.clientPage = '';
    this.templateStyle = '';
    this.templateClass= '';
    this.shownBuyingOptions = false;
    this.userData = {};
    this.mainViewContent = [
      [
        'create-account',
        html`
          <graficarte-store-create-account
            @create-account=${this.createAccount}
            @cancel-create-account=${this.cancelCreateAccount}>
          </graficarte-store-create-account>
        `
      ],
      [
        'client-store',
        this.contentCreator(this.clientPage, this.clientContent)
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
            @graficarte-login-action=${this.login}
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
            @update-user-data=${this.updateUserData}>
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

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      mainPage: { type: String },
      clientContent: { type: String },
      templateStyle: { type: String },
      templateClass: { type: String },
      shownBuyingOptions: { type: Boolean },
    };
  }

  login (e){
    const { userData } = e.detail;
    this.dispatchEvent(new CustomEvent('request-access-for-user', {
      detail: userData
    }))
  }

  cancelLogin (){
    this.dispatchEvent(new CustomEvent('cancel-access-for-user'))
  }

  updateUserData (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('update-user-data', { 
      detail
    }))
  }

  contentCreator (contentTag = '', templates = [['', html``]]) {
    const contentArray = templates.find(template => {
      return template[0] === contentTag;
    });

    if(contentArray && contentArray[1]) return contentArray[1];
  }

  render () {
    return html`${this.contentCreator(this.mainPage, this.mainViewContent)}`;
  }
}
customElements.define('graficarte-store-page-router', GraficarteStorePageRouter);
