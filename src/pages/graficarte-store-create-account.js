import { LitElement, html, css } from 'lit-element';

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputs = [];
  };

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputs : { type : Array}
    };
  };

  static get styles() {
    return css`
      div {
        display: block;
      }
    `;
  };

  render() {
    return html`
    <div>
      <form>
        <label>Nombre(s)</label>
        <input>
        <label>Apellidos</label>
        <input>
        <label>Correo electrónico</label>
        <input>
        <label>Dirección</label>
        <input>
        <label>Contraseña</label>
        <input>
        <label>Repita la contraseña</label>
        <input>
      </form>
      <button>Crear cuenta</button>
      <button>Cancelar</button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);