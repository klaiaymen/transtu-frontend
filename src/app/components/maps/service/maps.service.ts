import {Injectable} from "@angular/core";
import {Marker, Road} from "../model/maps.model";

const markers: Marker[] = [
  {
    location: '36.72401804664684,10.234412164543635',
  },
  {
    location: '36.72345862099936,10.234743937668727',
  },
  {
    location: '36.72051989314815,10.237024847875356',
  },

];

const routes: Road[] = [
  {
    weight: 3,
    color: 'blue',
    opacity: 0.5,
    mode: '',
    locations: [
      [36.72401804664684,10.234412164543635],
      [36.722343604074034,10.236809321838859],
      [36.720967652809456,10.234191054244564],
      [36.71649676932525,10.237273340415701],
    ],
  },
  {
    weight: 6,
    color: 'green',
    opacity: 0.2,
    mode: '',
    locations: [
      [36.72348416148641,10.235363215475882],
      [36.72345862099936,10.234743937668727],
      [36.72051989314815,10.237024847875356],
    ],
  },

];
@Injectable({
  providedIn: 'root'
})
export class MapsService {
  getMarkers(): Marker[] {
    return markers;
  }

  getRoutes(): Road[] {
    return routes;
  }
}
