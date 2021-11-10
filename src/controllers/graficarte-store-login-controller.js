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
    this.email = '';
    this.password = '';
    this.service = new GraficarteStoreAPI('POST', 'public/login');
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      user : { type : String},
      password : { type : String}
    };
  };

  updated(changedProps) {
    super.updated( changedProps );
    const emptyFields = this.getEmptyFields();

    if(emptyFields.length === 0){
      this._login();
    } else {
      this.missingFieldsMessage(emptyFields);
    };
  };

  getEmptyFields(){
    return [
      !this.email && 'email',
      !this.password && 'password'
    ].filter(field => field);
  };

  _login(){
    this.service.setRequestBody({
      email: this.email,
      password: this.password
    });
    this.service.request.addEventListener('readystatechange', this._checkRequestState.bind(this));
    this.service.doRequest();
  };

  missingFieldsMessage(emptyFields){
    this.dispatchEvent(new CustomEvent('graficarte-store-login-missing-fields', {
      detail: {
        emptyFields
      }
    }));
  };

  _checkRequestState(){
    if(this.service.request.readyState === 4 && this.service.request.status >= 200 && this.service.request.status < 300){
      this._successLogin();
      console.log(this.service.request.response)
      this.service.openRequest();
    } else if(this.service.request.readyState === 4 && this.service.request.status >= 400) {
      this._errorLogin();
      console.log('error at sign in controller request')
    };
  };

  _successLogin(){
    this.dispatchEvent( new CustomEvent('graficarte-store-login-succes'))
  };

  _errorLogin(){
    this.dispatchEvent( new CustomEvent('graficarte-store-login-error'))
  };
};

customElements.define('graficarte-store-login-controller', GraficarteStoreLoginController);