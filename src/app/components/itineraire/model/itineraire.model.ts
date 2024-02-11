import {Ligne} from "../../ligne/model/ligne.model";
import {Points} from "../../point/model/point.model";

export interface Itineraire {
  id: number;
  points: Points[];
  ligne: Ligne|null;
}
