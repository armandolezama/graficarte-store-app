import envCongif from '../../env-config';

export class GraficarteStoreLoginService {
  //Class to manage login service
  constructor(){
    this.response = {};
    this.payload = {};
    this.request = new XMLHttpRequest();
    this.request.open('POST', `${envCongif.GRAFICARTE_API}/login`);
  };

  _doRequest(){
    this.request.send()
  };


};