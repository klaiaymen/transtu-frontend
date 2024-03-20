import {Ligne} from "../../ligne/model/ligne.model";

export interface Station {
  id: number;
  label: string;
  code: string;
  longitude: any;
  latitude: any;
  ligne: Ligne;
  assignedToLigne:boolean;
  disabled:boolean;
}
