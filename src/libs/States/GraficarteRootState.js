import GraficarteStoreViewState from "./GraficarteStoreViewState";
import GraficarteClientState from "./GraficarteClientState";

export default class GraficarteRootState {
  constructor (){
    this.viewState = new GraficarteStoreViewState();
    this.clientState = new GraficarteClientState();
  }
}
