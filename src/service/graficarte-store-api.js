import envCongif from '../../env-config';

export class GraficarteStoreAPI {
  //Class to manage login service
  constructor(method, url){
    this.requestBody = {};
    this.method = method;
    this.url = `${envCongif.GRAFICARTE_API}/${url}`;
    this.request = {};
    this.openRequest();
  };

  doRequest(){
    console.log(this.requestBody)
    this.request.send(JSON.stringify(this.requestBody));
  };

  openRequest(){
    this.request = new XMLHttpRequest();
    this.request.open(this.method, this.url);
    this.request.setRequestHeader("Accept", "application/json");
    this.request.setRequestHeader('Content-Type', 'application/json');
  };

  setRequestBody(requestBody){
    this.requestBody = requestBody;
  };
};