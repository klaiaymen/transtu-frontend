import {Ligne} from "../../../../../ligne/model/ligne.model";


export class PointMaps {
  id?: number;
  location: any;
  tooltip?: {
    text: string;
  };
  onClick?: () => void;
}
export type APIKey = {
  bing?: string;

  google?: string;

  googleStatic?: string;
};

export interface ItineraireMaps {
  id:number,
  name: string,
  ligne: Ligne|null,
  weight: number;

  color: string;

  opacity: number;

  mode: string;

  locations: any[];
}
