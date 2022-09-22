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
import productMocks from '../../../utils/mocks/products-mocks';

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
    this.loginMissingFields = [];
    this.signinMissingFields = [];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      mainPage : { type: String },
      clientContent : { type: String },
      templateStyle : { type: String },
      templateClass : { type: String },
      shownBuyingOptions : { type: Boolean },
      loginMissingFields : { type: Array },
      signinMissingFields : { type: Array },
      mainViewContent : { type: Array },
    };
  }

  login (e){
    const { userData } = e.detail;
    this.dispatchEvent(new CustomEvent('request-access-for-user', {
      detail: userData
    }))
  }

  cancelLogin (){
    this.dispatchEvent(new CustomEvent('cancel-access-for-user'));
  }

  signin (e){
    const { userData } = e.detail;
    this.dispatchEvent(new CustomEvent('request-registration-for-user', {
      detail: userData
    }));
  }

  cancelSignin (){
    this.dispatchEvent(new CustomEvent('cancel-registration-for-user'))
  }

  updateUserData (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('update-user-data', { 
      detail
    }))
  }

  acceptError(){
    this.dispatchEvent(new CustomEvent('accept-error'))
  }

  clientContentCreator (){
    const contentArray = [
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
          <graficarte-store-error-page
          @accept-error=${this.acceptError}>
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
    ].find(template => {
      return template[0] === this.clientPage;
    });

    if(contentArray && contentArray[1]) return contentArray[1];
  }

  mainContentCreator () {
    const contentArray = [
      [
        'create-account',
        html`
          <graficarte-store-create-account
          .missingFields=${this.signinMissingFields}
            @graficarte-create-account=${this.signin}
            @graficarte-cancel-create-account=${this.cancelSignin}>
          </graficarte-store-create-account>
        `
      ],
      [
        'client-store',
        this.clientContentCreator(this.clientPage)
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
          .missingFields=${this.loginMissingFields}
            @graficarte-login-action=${this.login}
            @graficarte-cancel-login=${this.cancelLogin}>
          </graficarte-store-login-page>
        `
      ],
      [
        'error',
        html`
          <graficarte-store-error-page
          @accept-error=${this.acceptError}>
          </graficarte-store-error-page>
        `,
      ],
    ].find(template => {
      return template[0] === this.mainPage;
    });

    if(contentArray && contentArray[1]) return contentArray[1];
  }

  render () {
    return this.mainContentCreator();
  }
}
customElements.define('graficarte-store-page-router', GraficarteStorePageRouter);
