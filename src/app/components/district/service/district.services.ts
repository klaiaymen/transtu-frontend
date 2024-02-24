import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {District} from "../model/district.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError, map} from "rxjs/operators";

@Injectable({providedIn:"root"})
export class DistrictService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getDistricts():Observable<District[]>{
    return this.http.get<District[]>(this.baseUrl + '/api/district');
  }
  searchDistricts(query: string): Observable<District[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<District[]>(`${this.baseUrl}/api/district/search`, { params });
  }
  public save(district:District):Observable<District>{
    return this.http.post<District>(this.baseUrl+ '/api/district',district);
  }

  public delete(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ "/api/district/" +id);
  }

  public getDistrictById(id:number):Observable<District>{
    return this.http.get<District>(this.baseUrl+ "/api/district/" +id);
  }

  public update(district:District):Observable<District>{
    return this.http.put<District>(this.baseUrl+"/api/district/" + district.id, district);
  }

  /*public searchMoyensTransport(keyword:string):Observable<MoyenTransport[]>{
    let host="http://localhost:3000";
    return this.http.get<MoyenTransport[]>(`${host}/moyenTransports?name_like=${keyword}`);
  }*/

  assignMTToDistrict(mtId: number, districtId: number): Observable<MoyenTransport> {
    const url = `${this.baseUrl}/api/${mtId}/assign-to-district/${districtId}`;
    return this.http.post<MoyenTransport>(url, null);
  }

  removeMTFromDistrict(mtId: number, districtId: number): Observable<any> {
    const url = `${this.baseUrl}/api/${mtId}/remove-from-district/${districtId}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }
}
