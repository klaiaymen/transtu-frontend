import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";

export interface District {
  id: number;
  label: string;
  adress: string;
  phoneNumber: string;
  moyensTransport: MoyenTransport[];
}
