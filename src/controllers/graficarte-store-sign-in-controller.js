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
    this._service = new GraficarteStoreAPI('POST', 'public/signin');
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
    if(this._checkFieldsAreFull()){
      this._signIn();
    };
  };

  _checkFieldsAreFull(){
    return this.name === '' || this.name === 'undefined' || this.name === undefined ?  
    false : this.lastName === '' || this.lastName === 'undefined' || this.lastName === undefined? 
    false : this.email === '' || this.email === 'undefined' || this.email === undefined ? 
    false : this.address === '' || this.address === 'undefined' || this.address === undefined ?
    false : this.password === '' || this.password === 'undefined' || this.password === undefined ?
    false : this.password !== '' && this.password !== 'undefined' && this.password !== undefined
  }

   _signIn(){
    this._service.setRequestBody({
      name : this.name,
      lastName : this.lastName,
      email : this.email,
      address : this.address,
      password : this.password
    })
    this._service.request.addEventListener('readystatechange', this._checkRequestState.bind(this))
    this._service.doRequest();
  };

  _checkRequestState(){
    console.log('checkout request state')
    console.log(this);
    if(this._service.request.readyState === 4 && this._service.request.status === 200){
      this._successSignIn();
      console.log(this._service.request.response)
      this._service.openRequest();
    } else {
      console.log('error at sign in controller request')
    }
  }

  _successSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-success'))
  };

  _errorSignIn(){
    this.dispatchEvent(new CustomEvent('graficarte-store-sign-in-error'))
  };
}
customElements.define('graficarte-store-sign-in-controller', GraficarteStoreSignInController);