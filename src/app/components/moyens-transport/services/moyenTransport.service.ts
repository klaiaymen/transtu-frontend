import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MoyenTransport} from "../model/moyenTransport.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Itineraire} from "../../itineraire/model/itineraire.model";

@Injectable({providedIn:"root"})
export class MoyenTransportService{
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getMoyensTransport():Observable<MoyenTransport[]>{
    return this.http.get<MoyenTransport[]>(this.baseUrl + '/api/mt');
  }

  searchMts(query: string): Observable<MoyenTransport[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<MoyenTransport[]>(`${this.baseUrl}/api/mt/search`, { params });
  }

  public getMts(page: number=1, size:number=4):Observable<Array<MoyenTransport>>{
    return this.http.get<Array<MoyenTransport>>(`http://localhost:8081/api/mt?_page=${page}&_limit=${size}`);
  }
  public save(moyentransport:MoyenTransport):Observable<MoyenTransport>{
    return this.http.post<MoyenTransport>(this.baseUrl+ '/api/mt',moyentransport);
  }

  public delete(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ "/api/mt/" +id);
  }

  public getMtById(id:number):Observable<MoyenTransport>{
    return this.http.get<MoyenTransport>(this.baseUrl+ "/api/mt/" +id);
  }

  public update(moyenTransport:MoyenTransport):Observable<MoyenTransport>{
    return this.http.put<MoyenTransport>(this.baseUrl+"/api/mt/" + moyenTransport.id, moyenTransport);
  }

  /*public searchMoyensTransport(keyword:string):Observable<MoyenTransport[]>{
    let host="http://localhost:3000";
    return this.http.get<MoyenTransport[]>(`${host}/moyenTransports?name_like=${keyword}`);
  }*/
}
