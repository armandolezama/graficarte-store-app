import { LitElement, html, css } from 'lit-element';
import 'sophos-icon/sophos-icon';

export class GraficarteStoreClientNavBar extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.options = [];
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      options : { type : Array}
    };
  };

  static get styles() {
    return css`
      sophos-icon{
        --sophos-icon-icon-image-width: 100px;
        --sophos-icon-icon-image-height: 100px;
        --sophos-icon-icon-text-font-size: 20px;
      }

      p {
        font-size: 20px;
      }
    `;
  };

  finishSesion() {
    this.dispatchEvent(new CustomEvent('finish-sesion'))
  };

  render() {
    return html`
      <div id="client-nav-bar-container">
        <sophos-icon
        imageSource="./assets/client-user.png"
        imageAlt="client-pickture"
        iconText="Client-user"
        iconDirection="top">
        </sophos-icon>
        <div>
          <p>Mis compras</p>
          <p>Métodos de pago</p>
          <p>Perfil</p>
          <p>Notificaciones</p>
          <p>Configuraciones</p>
        </div>
        <button @click="${this.finishSesion}">Cerrar sesión</button>
      </div>
    
    `;
  };
};
customElements.define('graficarte-store-client-nav-bar', GraficarteStoreClientNavBar);