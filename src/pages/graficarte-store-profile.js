import { LitElement, html, css } from 'lit-element';
import 'sophos-card/sophos-card';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';

export class GraficarteStoreProfile extends LitElement {
    /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
     constructor() {
      super();
      this.profilePicture = './assets/client-user.png';
      this.profilePictureAlt = 'profile image';
      this.clientName = 'John Doe';
      this.clientSurname = 'Doe Doe';
      this.clientDescription = 'Usuario desde hace rato'
      this.clientForm = [
        {
          label: 'Nombre(s)',
          fieldName: 'client-name',
          type: 'text',
          isDisabled: true,
        },
        {
          label: 'Apellidos',
          fieldName: 'client-surname',
          type: 'text',
          isDisabled: true,
        },
        {
          label: 'Correo electrónico',
          fieldName: 'client-email',
          type: 'text',
          isDisabled: true,
        },
        {
          label: 'Dirección',
          fieldName: 'client-address',
          type: 'text',
          isDisabled: true,
        },
      ];
    };
  
    /**
      * Declared properties and their corresponding attributes
      */
    static get properties() {
      return {
        profilePicture : { type : String },
        profilePictureAlt : { type: String },
        clientName : { type : String},
        clienSurname : { type : String},
        clienDescription : { type : String},
        clientForm : { type : Array}
      };
    };
  
    static get styles() {
      return css`
        sophos-card {
          --sophos-card-host-width: 100%;
          --sophos-card-host-max-width: 200px;
          --sophos-card-host-min-width: 100px;
          --sophos-card-main-container-cursor: pointer;
          margin: clamp(20px, 40px, 90px);
          flex-grow: 2;
        }

        sophos-chimera-input {
          --sophos-chimera-input-main-container-height : auto;
        }
      `;
    };

    editField(e){
      const field = e.target.getAttribute('field-name');
      const editableField = this.clientForm.filter(input => input.fieldName === field);
      editableField[0].isDisabled = false;
      this.requestUpdate();
    };
  
    render() {
      return html`
        <div id="main-container">
          <div id="card-container">
            <sophos-card
            .pictureSRC="${this.profilePicture}"
            .pictureAlt="${this.profilePictureAlt}"
            .title="${this.clientName}"
            .subtitle="${this.clienSurname}"
            .description="${this.clientDescription}">
            </sophos-card>
          </div>
          <div id="client-form-container">
            ${this.clientForm.map(inputForm => html`
              <sophos-chimera-input
                field-name="${inputForm.fieldName}"
                .styleOfInput="${'basic'}"
                .label="${inputForm.label}"
                .type="${inputForm.type}"
                ?isDisabled="${inputForm.isDisabled}">
              </sophos-chimera-input>
              <sophos-chimera-button
                field-name="${inputForm.fieldName}"
                .type="${'simple-multi-button'}"
                .buttonsLabels="${['Editar']}"
                @sophos-chimera-button-click="${this.editField}">
              </sophos-chimera-button>
            `)}
          </div>
        </div>
      `;
    };
};
customElements.define('graficarte-store-profile', GraficarteStoreProfile);