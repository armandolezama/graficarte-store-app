import { css } from "lit";

export default css`

.input-form-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 350px;
}

.input-form-button {
  display: flex;
  position: relative;
  right: 0;
  bottom: -9px;
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
`;