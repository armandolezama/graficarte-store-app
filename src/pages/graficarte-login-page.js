import { LitElement, html, css } from 'lit-element';

export class GraficarteLoginPage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.userNameLabel = 'Nombre de usuario';
    this.userNameInputPlaceholder = 'Usuario';
    this.userPasswordLabel = 'Contraseña'
    this.userPasswordPlaceholder = 'Password';
    this._userName = '';
    this._password = '';
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      userNameLabel : { type : String},
      userNameInputPlaceholder : { type : String}
    };
  };

  static get styles() {
    return css`
      #login-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 99vh;
      }

      #login-form-container{
        background: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 400px;
        height: 300px;
        border-radius: 30px;
      }

      #login-form-container input{
        display: flex;
        height: 40px;
        width: 200px;
        font-size: 20px;
        margin: 10px;
      }

      #login-form-container label {
        font-size: 20px;
        margin: 10px;
      }

      #login-form-container button {
        font-size: 20px;
      }
    `;
  };

  setUserName(e) {
    this._userName = e.target.value;
  };

  setPassword(e) {
    this._password = e.target.value;
  }

  submit(){
    const detail = {
      userName: this._userName,
      password: this._password
    };
    this.dispatchEvent(new CustomEvent('graficarte-login-submit', { detail }))
  }

  render() {
    return html`
      <div id="login-container">
        <div id="login-form-container">
          <form id="login-form">
            <label 
            id="user-name-label" 
            for="user-name">${this.userNameLabel}</label>
            <input 
            id="user-name-input" 
            type="text" 
            name="user-name" 
            placeholder="${this.userNameInputPlaceholder}" 
            @input="${this.setUserName}">
            <label 
            id="user-password-label" 
            for="password">${this.userPasswordLabel}</label>
            <input 
            id="password-input" 
            type="password" 
            name="password" 
            placeholder="${this.userPasswordPlaceholder}" 
            @input="${this.setPassword}">
          </form>
          <button @click="${this.submit}" id="login-submit">Entrar</button>
        </div>
      </div>
    `;
  };
};
customElements.define('graficarte-login-page', GraficarteLoginPage);