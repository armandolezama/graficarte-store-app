import GraficarteStoreViewState from "./States/GraficarteStoreViewState";
import GraficarteClientState from "./States/GraficarteClientState";

export default class GraficarteRootState {
  constructor (){
    this.viewState = new GraficarteStoreViewState();
    this.clientState = new GraficarteClientState();
  }
}
