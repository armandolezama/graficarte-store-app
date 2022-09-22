import { ServiceController } from "./controller-class/ServiceController";

export class GraficarteStoreSignInController extends ServiceController {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.userData= {};
    this.method = 'POST';
    this.url = 'public/signin';
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

  willUpdate (changedProps){
    super.willUpdate(changedProps)
    const missingFields = this.getEmptyFields(this.userData);
    if (missingFields.length > 0) {
      this.dispatchEvent(new CustomEvent('missing-fields', {
        detail: {
          channelName: 'graficarte-signin-missing-fields',
          missingFields
        },
      }));
    } else {
      this._signIn()
    }
  }

  getEmptyFields (data){
    return [
      !data.name && 'name',
      !data.lastName && 'lastName',
      !data.phoneNumber && 'phoneNumber',
      !data.email && 'email',
      !data.address && 'address',
      !data.password && 'password'
    ].filter(field => field);
  }

   _signIn (){
    this.body = {
      name: this.name,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address,
      password: this.password,
    }
    this.setService();
    this.setListeners();
    this.doRequest();
    this.flushData();
  }

  missingFieldsMessage (emptyFields){
    this.dispatchEvent(new CustomEvent('missing-fields', {
      detail: {
        emptyFields
      }
    }));
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
