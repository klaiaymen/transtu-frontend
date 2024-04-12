import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn:"root"})
export class PhotoReclamationService {
  private baseUrl = 'http://localhost:8888/RECLAMATION-SERVICE';
  constructor(private http:HttpClient) { }

  savePhoto(reclamationId: number, photoUrl: string): Observable<any> {
    /*const data = {
      reclamationId: reclamationId,
      url: photoUrl
    };*/

    return this.http.post<any>(this.baseUrl+ '/api/photo-reclamation/'+reclamationId, photoUrl);
  }

}
