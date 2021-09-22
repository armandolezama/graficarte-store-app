import envCongif from '../../env-config';

export class GraficarteStoreSignInService {
  constructor(){
    this.response = {};
    this.payload = {};
    this.request = new XMLHttpRequest();
    this.request.open('POST', `${envCongif.GRAFICARTE_API}/signin`)
  };

  _doRequest(){};
};