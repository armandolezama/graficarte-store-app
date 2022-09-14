import { css } from "lit";

export default css`
#login-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

#login-form-container{
  background: #FFFFFF;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

sophos-chimera-input {
  --sophos-chimera-input-main-container-height: auto;
}

sophos-chimera-button {
  --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin: 0 20px;
}

.modal-buttons {
  --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin: 20px 20px;
}
`;
