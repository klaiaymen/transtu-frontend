import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Ligne} from "../../ligne/model/ligne.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError} from "rxjs/operators";
import {Station} from "../../station/model/station.model";
import {Itineraire} from "../model/itineraire.model";
import {Points} from "../../point/model/point.model";
import {Road} from "../../maps/model/maps.model";

@Injectable({providedIn:"root"})
export class ItineraireService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getItineraires():Observable<Itineraire[]>{
    return this.http.get<Itineraire[]>(this.baseUrl + '/api/itineraire');
  }

  searchItineraires(query: string): Observable<Itineraire[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Itineraire[]>(`${this.baseUrl}/api/itineraire/search`, { params });
  }

  public getItinerairesByDistrict(districtId:number|undefined):Observable<Itineraire[]>{
    return this.http.get<Itineraire[]>(this.baseUrl + '/api/itineraire-district/'+districtId);
  }
  public save(itineraire:Itineraire):Observable<Itineraire>{
    return this.http.post<Itineraire>(this.baseUrl+ '/api/itineraire',itineraire);
  }

  public delete(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ "/api/itineraire/" +id);
  }

  public getItineraireById(id:number):Observable<Itineraire>{
    return this.http.get<Itineraire>(this.baseUrl+ "/api/itineraire/" +id);
  }

  public update(itineraire:Itineraire):Observable<Itineraire>{
    return this.http.put<Itineraire>(this.baseUrl+"/api/itineraire/" + itineraire.id, itineraire);
  }

  assignLigneToItineraire(ligneId: number, itineraireId: number): Observable<Ligne> {
    const url = `${this.baseUrl}/api/${ligneId}/assign-ligne-to-itineraire/${itineraireId}`;
    return this.http.post<Ligne>(url, null);
  }

  removeLigneFromItineraire(ligneId: number, itineraireId: number): Observable<any> {
    const url = `${this.baseUrl}/api/${ligneId}/remove-ligne-from-itineraire/${itineraireId}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }

  assignPointToItineraire(pointId: number|undefined, itineraireId: number): Observable<Points> {
    const url = `${this.baseUrl}/api/${pointId}/assign-point-to-itineraire/${itineraireId}`;
    return this.http.post<Points>(url, null);
  }

  removePointFromItineraire(pointId: number|undefined, itineraireId: number): Observable<any> {
    const url = `${this.baseUrl}/api/${pointId}/remove-point-from-itineraire/${itineraireId}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }


}
