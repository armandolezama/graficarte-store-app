import { LitElement } from 'lit-element';
import { GraficarteStoreAPI } from '../service/graficarte-store-api';

export class GraficarteStoreLoginController extends LitElement {
  //component to manage error or success response from login service

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this._userName = '';
    this._userPassword = '';
    this._service = new GraficarteStoreAPI('POST', 'public/login');
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      _username : { type : String},
      _userPassword : { type : String}
    };
  };

  _login(){};

  _successLogin(){
    this.dispatchEvent( new CustomEvent('graficarte-store-login-succes'))
  };

  _errorLogin(){
    this.dispatchEvent( new CustomEvent('graficarte-store-login-error'))
  };
};

customElements.define('graficarte-store-login-controller', GraficarteStoreLoginController);