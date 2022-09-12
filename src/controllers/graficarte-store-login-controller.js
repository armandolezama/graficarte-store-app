import { ServiceController } from "./controller-class/ServiceController";

export class GraficarteStoreLoginController extends ServiceController {
  //component to manage error or success response from login service

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.email = '';
    this.password = '';
    this.method = 'POST';
    this.url = 'public/login';
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      email : { type : String},
      password : { type : String}
    };
  }

  updated (changedProps) {
    super.updated( changedProps );
    const emptyFields = this.getEmptyFields();

    if(emptyFields.length === 0){
      this._login();
    }
  }

  getEmptyFields (){
    return [
      !this.email && 'email',
      !this.password && 'password'
    ].filter(field => field);
  }

  _login (){
    
    this.body = {
      email: this.email,
      password: this.password
    }
    this.setService();
    this.setListeners();
    this.doRequest();
    this.flushData();
  
  }

  flushData () {
    this.email = '';
    this.password = '';
  }
}

customElements.define('graficarte-store-login-controller', GraficarteStoreLoginController);
