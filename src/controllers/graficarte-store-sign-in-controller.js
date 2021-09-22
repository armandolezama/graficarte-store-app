import { LitElement } from 'lit-element';
import { GraficarteStoreSignInService } from '../services/graficarte-store-sign-in-service'

export class GraficarteStoreSignInController extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this._service = new GraficarteStoreSignInService();
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
    };
  };

  _signIn(){};

  _successSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-success'))
  };

  _errorSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-error'))
  };
}
customElements.define('graficarte-store-sign-in-controller', GraficarteStoreSignInController);