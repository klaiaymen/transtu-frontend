import {Ligne} from "../../ligne/model/ligne.model";
import {Points} from "../../point/model/point.model";

export interface Itineraire {
  id: number;

  name: string;

  points: any[];

  ligne: Ligne|null;

  weight: number;

  color: string;

  opacity: number;

  mode: string;

}
