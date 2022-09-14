import { css } from 'lit';

export default css`
sophos-chimera-input {
  --sophos-chimera-input-main-container-height: 85px;
  --sophos-chimera-input-input-container-input-style-simple-bar-input-input-tag-height: 30px;
  --sophos-chimera-input-input-message-margin: 5px 0 10px;
  --sophos-chimera-input-input-container-input-style-simple-bar-input-margin-bottom: 40px;
}

#password-message-container[message-style="password-message-success"] {
  background-color: #73db46;
}

#password-message-container[message-style="password-message-error"] {
  background-color: #ff1e00;
}

#password-message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 0 0 30px 0;
  border-radius: 20px;
  opacity: 0.8;
}

#password-message {
  font-size: 1rem;
  font-family: monospace;
  font-weight: bold;
}

#password-message[message="success"] {
  color: #000;
}

#password-message[message="error"] {
  color: #fff;
}
`;
