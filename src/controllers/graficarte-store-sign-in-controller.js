import { LitElement } from 'lit-element';
import { GraficarteStoreAPI } from '../service/graficarte-store-api';

export class GraficarteStoreSignInController extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.address = '';
    this.password = '';
    this.service = new GraficarteStoreAPI('POST', 'public/signin');
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      name : { type : String },
      lastName: { type : String },
      email : { type : String },
      address : { type : String },
      password : { type : String }
    };
  };

  updated(changedProps) {
    super.updated( changedProps );
    const emptyFields = this.getEmptyFields();

    if(emptyFields.length === 0){
      this._signIn();
    } else {
      this.missingFieldsMessage(emptyFields);
    };
  };

  getEmptyFields(){
    return [
      !this.name && 'name',
      !this.lastName && 'lastName',
      !this.email && 'email',
      !this.address && 'address',
      !this.password && 'password'
    ].filter(field => field);
  };

   _signIn(){
    this.service.setRequestBody({
      name : this.name,
      lastName : this.lastName,
      email : this.email,
      address : this.address,
      password : this.password
    })
    this.service.request.addEventListener('readystatechange', this._checkRequestState.bind(this))
    this.service.doRequest();
  };

  missingFieldsMessage(emptyFields){
    this.dispatchEvent(new CustomEvent('graficarte-store-create-account-missing-fields', {
      detail: {
        emptyFields
      }
    }));
  };

  _checkRequestState(){
    if(this.service.request.readyState === 4 && this.service.request.status >= 200 && this.service.request.status < 300){
      this._successSignIn();
      console.log(this.service.request.response)
      this.service.openRequest();
    } else if(this.service.request.readyState === 4 && this.service.request.status >= 400) {
      this._errorSignIn();
      console.log('error at sign in controller request')
    };
  };

  _successSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-success'))
  };

  _errorSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-error'))
  };
}
customElements.define('graficarte-store-sign-in-controller', GraficarteStoreSignInController);