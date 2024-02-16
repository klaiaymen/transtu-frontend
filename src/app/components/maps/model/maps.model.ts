export class Marker {
  location: any;
}

export type APIKey = {
  bing?: string;

  google?: string;

  googleStatic?: string;
};

export interface Road {
  weight: number;

  color: string;

  opacity: number;

  mode: string;

  locations: any[];
}
