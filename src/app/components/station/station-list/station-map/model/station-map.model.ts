export class StationMaps {
  id?: number;
  location: any;
  tooltip?: {
    text: string;
  };
  onClick?: () => void;
  onMarkerMouseover?: () => void;
  onMarkerMouseout?: () => void;
}
export type APIKey = {
  bing?: string;

  google?: string;

  googleStatic?: string;
};
