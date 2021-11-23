import { LitElement, html, css } from 'lit-element';
import 'sophos-icon/sophos-icon';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales/';

export class GraficarteStoreClientNavBar extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.clientOptions = [
      getLocal('graficarte-store-client-nav-bar-options-client-store'),
      getLocal('graficarte-store-client-nav-bar-options-my-shopping'),
      getLocal('graficarte-store-client-nav-bar-options-payment-methods'),
      getLocal('graficarte-store-client-nav-bar-options-profile'),
      getLocal('graficarte-store-client-nav-bar-options-notifications'),
      getLocal('graficarte-store-client-nav-bar-options-configuration')
    ];
    this.finishSesionLabel = [getLocal('graficarte-store-client-nav-bar-options-end-session')];
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      clientOptions : { type : Array},
      finishSesionLabel : { type : Array}
    };
  };

  static get styles() {
    return css`
      sophos-icon{
        --sophos-icon-icon-image-width: 100px;
        --sophos-icon-icon-image-height: 100px;
        --sophos-icon-icon-text-font-size: 20px;
      }

      #client-options-multi-button{
        --sophos-chimera-button-flex-direction: column;
        --sophos-chimera-button-flex-flow: column;
        --sophos-chimera-button-width: 140px;
      }
    `;
  };

  navigate(e){
    const option = e.detail.option;
    this.dispatchEvent(new CustomEvent('graficarte-navigate-to-page', { detail: { option} }));
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
          <sophos-chimera-button
          id="client-options-multi-button"
          type="simple-multi-button"
          .buttonsLabels="${this.clientOptions}"
          @sophos-chimera-button-click="${this.navigate}">
          </sophos-chimera-button>
        </div>
        <sophos-chimera-button
        type="simple-multi-button"
        .buttonsLabels="${this.finishSesionLabel}"
        @sophos-chimera-button-click="${this.finishSesion}">Cerrar sesión</sophos-chimera-button>
      </div>
    
    `;
  };
};
customElements.define('graficarte-store-client-nav-bar', GraficarteStoreClientNavBar);