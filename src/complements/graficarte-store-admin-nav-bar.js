import { LitElement, html, css } from 'lit';
import 'sophos-icon/sophos-icon';
import 'sophos-chimera-button/sophos-chimera-button';

export class GraficarteStoreAdminNavBar extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.adminOptions = [
      {label: 'Contabilidad'},
      {label: 'Envíos'},
      {label: 'Inventario'},
      {label: 'Repartidores'},
      {label: 'Historial de ventas'},
      {label: 'Configuraciones'},
    ];
    this.finishSesionLabel = ['Cerrar sesión'];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      adminOptions : { type : Array},
      finishSesionLabel : { type : Array}
    };
  }

  static get styles () {
    return css`
      sophos-icon{
        --sophos-icon-icon-image-width: 100px;
        --sophos-icon-icon-image-height: 100px;
        --sophos-icon-icon-text-font-size: 20px;
      }

      #admin-options-multi-button{
        --sophos-chimera-button-flex-direction: column;
        --sophos-chimera-button-flex-flow: column;
        --sophos-chimera-button-width: 140px;
      }
    `;
  }

  finishSesion () {
    this.dispatchEvent(new CustomEvent('finish-sesion'))
  }

  render () {
    return html`
      <div id="admin-nav-bar-container">
        <sophos-icon
        imageSource="./assets/admin-user.png"
        imageAlt="admin-pickture"
        iconText="Admin-user"
        iconDirection="top">
        </sophos-icon>
        <div>
        <sophos-chimera-button
          id="admin-options-multi-button"
          type="simple-multi-button"
          .buttonsLabels=${this.adminOptions}>
          </sophos-chimera-button>
        </div>
        <sophos-chimera-button 
        type="simple-multi-button"
        .buttonsLabels=${this.finishSesionLabel}
        @sophos-chimera-button-click=${this.finishSesion}></sophos-chimera-button>
      </div>
    
    `;
  }
}

customElements.define('graficarte-store-admin-nav-bar', GraficarteStoreAdminNavBar);
