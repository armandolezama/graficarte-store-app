import { LitElement, html, css } from 'lit-element';
import 'sophos-icon/sophos-icon';

export class GraficarteStoreAdminNavBar extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
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

  render() {
    return html`
      <div id="admin-nav-bar-container">
        <sophos-icon
        imageSource="./assets/admin-user.png"
        imageAlt="admin-pickture"
        iconText="Admin-user"
        iconDirection="top">
        </sophos-icon>
        <div>
          <p>Contabilidad</p>
          <p>Envíos</p>
          <p>Inventario</p>
          <p>Repartidores</p>
          <p>Historial de ventas</p>
          <p>Configuraciones</p>
        </div>
        <button>Cerrar sesión</button>
      </div>
    
    `;
  };
};
customElements.define('graficarte-store-admin-nav-bar', GraficarteStoreAdminNavBar);