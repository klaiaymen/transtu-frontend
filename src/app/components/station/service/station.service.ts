import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Ligne} from "../../ligne/model/ligne.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError} from "rxjs/operators";
import {Station} from "../model/station.model";
import {Itineraire} from "../../itineraire/model/itineraire.model";

@Injectable({providedIn:"root"})
export class StationService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.baseUrl + '/api/station');
  }

  searchStations(query: string): Observable<Station[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Station[]>(`${this.baseUrl}/api/station/search`, { params });
  }
  public save(station: Station): Observable<Station> {
    return this.http.post<Station>(this.baseUrl + '/api/station', station);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/api/station/" + id);
  }

  public getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(this.baseUrl + "/api/station/" + id);
  }

  public update(station: Station): Observable<Station> {
    return this.http.put<Station>(this.baseUrl + "/api/station/" + station.id, station);
  }

  public getStationsByDistrict(districtId:number|undefined):Observable<Station[]>{
    return this.http.get<Station[]>(this.baseUrl + '/api/station-district/'+districtId);
  }
}
