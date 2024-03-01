import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {District} from "../../district/model/district.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError} from "rxjs/operators";
import {Reclamation} from "../model/reclamation.model";

@Injectable({providedIn:"root"})
export class ReclamationService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getReclamations():Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.baseUrl + '/api/reclamation');
  }
  searchReclamations(query: string): Observable<Reclamation[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/search`, { params });
  }
  public save(reclamation:Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamation',reclamation);
  }

  createReclamation(formData: FormData): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamationWithPhotos', formData);
  }
  public delete(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ "/api/reclamation/" +id);
  }

  public getReclamationById(id:number):Observable<Reclamation>{
    return this.http.get<Reclamation>(this.baseUrl+ "/api/reclamation/" +id);
  }

  public update(reclamation:Reclamation):Observable<Reclamation>{
    return this.http.put<Reclamation>(this.baseUrl+"/api/reclamation/" + reclamation.id, reclamation);
  }

  public userValidate(id:number|undefined):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamation/userValidate/'+id,{});
  }

  public dispatcherValidate(id:number):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamation/dispatcherValidate/'+id, {});
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reclamation/sendEmail`, emailData);
  }
}
