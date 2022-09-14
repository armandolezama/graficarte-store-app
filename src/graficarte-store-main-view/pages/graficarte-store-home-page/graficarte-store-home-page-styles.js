import { css } from "lit";

export default css`
#home-page-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-button {
  border-radius: 30px;
}

sophos-card {
  --sophos-card-host-width: 100%;
  --sophos-card-host-max-width: 200px;
  --sophos-card-host-min-width: 100px;
  --sophos-card-main-container-background-color: transparent;
  margin: clamp(20px, 40px, 90px);
  flex-grow: 2;
}
`;
