import {Ligne} from "../../ligne/model/ligne.model";
import {Points} from "../../point/model/point.model";

export interface Itineraire {
  id: number;
  name: string;
  points: Points[];
  ligne: Ligne|null;
}
