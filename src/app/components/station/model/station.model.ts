import {Ligne} from "../../ligne/model/ligne.model";

export interface Station {
  id: number;
  label: string;
  code: string;
  longitude: number;
  latitude: number;
  ligne: Ligne;
  assignedToLigne:boolean;
}
