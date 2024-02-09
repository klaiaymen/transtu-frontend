import {Ligne} from "../../ligne/model/ligne.model";

export interface Station {
  id: number;
  label: string;
  code: string;
  longitude: number;
  lattitude: number;
  ligne: Ligne;
  assignedToLigne:boolean;
}
