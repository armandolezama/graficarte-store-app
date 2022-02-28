/**
 * TO-DO: turn this controller modal into gneneral controllers model (Super class maybe);
 */
import { LitElement } from 'lit';
import GraficarteStoreAPI from '../service/graficarte-store-api';

export class GraficarteStoreSignInController extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.name = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';
    this.password = '';
    this.method = 'POST';
    this.url = 'public/signin';
    this.setService();
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      name : { type : String },
      lastName: { type : String },
      phoneNumber: { type : String},
      email : { type : String },
      address : { type : String },
      password : { type : String },
    };
  }

  updated (changedProps) {
    super.updated( changedProps );
    const emptyFields = this.getEmptyFields();

    if(emptyFields.length === 0){
      this._signIn();
    }
  }

  getEmptyFields (){
    return [
      !this.name && 'name',
      !this.lastName && 'lastName',
      !this.phoneNumber && 'phoneNumber',
      !this.email && 'email',
      !this.address && 'address',
      !this.password && 'password'
    ].filter(field => field);
  }

   _signIn (){
    this.service.setRequestBody({
      name : this.name,
      lastName : this.lastName,
      phoneNumber : this.phoneNumber,
      email : this.email,
      address : this.address,
      password : this.password
    })

    this.service.addEventListener('request-is-in-progress', () => {
      this.dispatchEvent(new CustomEvent('request-in-progress'));
    });
    
    this.service.addEventListener('request-is-done', e => {
      const payload =e.detail.response;
      this.dispatchEvent(new CustomEvent('request-is-done', {
        detail: { payload }
      }));
      this.setService();
    });

    this.service.addEventListener('request-failed', () => {
      this.dispatchEvent(new CustomEvent('request-failed'), {
        detail: {}
      });
      this.setService();
    });
    this.service.doRequest();
    this.flushData()
  }

  missingFieldsMessage (emptyFields){
    this.dispatchEvent(new CustomEvent('missing-fields', {
      detail: {
        emptyFields
      }
    }));
  }

  setService (method = this.method, url = this.url){
    this.service = new GraficarteStoreAPI(method, url);
  }

  flushData () {
    this.name = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';
    this.password = '';
  }
}

customElements.define('graficarte-store-sign-in-controller', GraficarteStoreSignInController);