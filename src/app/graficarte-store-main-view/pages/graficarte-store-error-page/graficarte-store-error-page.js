import { LitElement, html, css } from 'lit';
import 'sophos-chimera-button/sophos-chimera-button';

export class GraficarteStoreErrorPage extends LitElement {
    /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
     constructor () {
      super();
    }
  
    /**
      * Declared properties and their corresponding attributes
      */
    static get properties () {
      return {};
    }
  
    static get styles () {
      return css``;
    }

    acceptError(){
      this.dispatchEvent(new CustomEvent('accept-error'))
    }
  
    render () {
      return html`
        <div>
          <div>
            Algo salió mal, inente más tarde
          </div>
          <sophos-chimera-button
          .buttonsLabels=${[
            {
              label: 'Aceptar',
              key: 'accep-error',
            }
          ]}
          @sophos-chimera-button-click=${this.acceptError}>
          </sophos-chimera-button>
        </div>
      `;
    }
}

customElements.define('graficarte-store-error-page', GraficarteStoreErrorPage);
