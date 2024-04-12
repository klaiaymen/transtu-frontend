import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Points} from "../model/point.model";

@Injectable({providedIn:"root"})
export class PointService {
  private baseUrl = 'http://localhost:8888/GESTIONACCIDENTSINCIDENTS';

  constructor(private http: HttpClient) {
  }

  public getPoints(): Observable<Points[]> {
    return this.http.get<Points[]>(this.baseUrl + '/api/point');
  }

  public save(point: Points): Observable<Points> {
    return this.http.post<Points>(this.baseUrl + '/api/point', point);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/api/point/" + id);
  }

  public getPointById(id: number): Observable<Points> {
    return this.http.get<Points>(this.baseUrl + "/api/point/" + id);
  }

  public update(point: Points): Observable<Points> {
    return this.http.put<Points>(this.baseUrl + "/api/point/" + point.id, point);
  }
}
