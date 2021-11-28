import { LitElement, html, css } from 'lit-element';
import 'sophos-card/sophos-card';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales';

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
      this.clientDescription = 'Usuario desde hace rato';
      this.clientInputStyle = 'basic';
      this.clientButtonStyle = 'simple-multi-button';
      this.clientEditButtonMessage = {
        label: getLocal('graficarte-store-client-profile-client-edit-field-button'),
        key: 'edit',
      };
      this.clientForm = [
        {
          label: getLocal('graficarte-store-client-profile-client-name'),
          fieldName: 'client-name',
          type: 'text',
          isDisabled: true,
        },
        {
          label: getLocal('graficarte-store-client-profile-client-surname'),
          fieldName: 'client-surname',
          type: 'text',
          isDisabled: true,
        },
        {
          label: getLocal('graficarte-store-client-profile-client-phone-number'),
          fieldName: 'client-phone-number',
          type: 'text',
          isDisabled: true,
        },
        {
          label: getLocal('graficarte-store-client-profile-client-email'),
          fieldName: 'client-email',
          type: 'text',
          isDisabled: true,
        },
        {
          label: getLocal('graficarte-store-client-profile-client-address'),
          fieldName: 'client-address',
          type: 'text',
          isDisabled: true,
        },
      ];
      this.formButtonLabels = [
        {
          label: getLocal('graficarte-store-client-profile-client-save-button'),
          key: 'save',
        }
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

        .input-form-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          width: 350px;
        }

        .input-form-button {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #card-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #client-form-buttons-container {
          margin-top: 60px;
        }

        #save-cancel-button {
          --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin-bottom: 0;
          --sophos-chimera-button-height: 35px;
        }

        sophos-card {
          --sophos-card-host-width: 100%;
          --sophos-card-host-max-width: 200px;
          --sophos-card-host-min-width: 100px;
          --sophos-card-main-container-cursor: pointer;
        }

        .form-input {
          --sophos-chimera-input-main-container-height : auto;
        }
        
        .form-button {
          --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin-bottom: 0;
          --sophos-chimera-button-height: 20px;
          margin-top: 45px;
        }
      `;
    };

    editField(e){
      const field = e.target.getAttribute('field-name');
      const editableField = this.clientForm.filter(input => input.fieldName === field);
      editableField[0].isDisabled = false;
      this.requestUpdate();
    };

    _manageSaveCancelOptions(e){
      const { option } = e.detail;
      if (option === 0) {
        
      } 
    };

    saveData(){
      this.dispatchEvent(new CustomEvent('graficarte-store-profile-has-changed'));
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
              <div class="input-form-container">
                <sophos-chimera-input
                  class="form-input"
                  field-name="${inputForm.fieldName}"
                  .styleOfInput="${this.clientInputStyle}"
                  .label="${inputForm.label}"
                  .type="${inputForm.type}"
                  ?isDisabled="${inputForm.isDisabled}">
                </sophos-chimera-input>
                <div class="input-form-button">
                  <sophos-chimera-button
                    class="form-button"
                    field-name="${inputForm.fieldName}"
                    .type="${this.clientButtonStyle}"
                    .buttonsLabels="${[this.clientEditButtonMessage]}"
                    @sophos-chimera-button-click="${this.editField}">
                  </sophos-chimera-button>
                </div>
              </div>
            `)}
            <div id="client-form-buttons-container">
              <sophos-chimera-button
              id="save-cancel-button"
              .type="${this.clientButtonStyle}"
              .buttonsLabels="${this.formButtonLabels}"></sophos-chimera-button>
            </div>
          </div>
        </div>
      `;
    };
};
customElements.define('graficarte-store-profile', GraficarteStoreProfile);