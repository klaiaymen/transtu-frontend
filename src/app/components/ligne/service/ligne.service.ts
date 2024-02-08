import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Ligne} from "../model/ligne.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError} from "rxjs/operators";

@Injectable({providedIn:"root"})
export class LigneService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getLignes():Observable<Ligne[]>{
    return this.http.get<Ligne[]>(this.baseUrl + '/api/ligne');
  }
  public save(ligne:Ligne):Observable<Ligne>{
    return this.http.post<Ligne>(this.baseUrl+ '/api/ligne',ligne);
  }

  public delete(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ "/api/ligne/" +id);
  }

  public getLigneById(id:number):Observable<Ligne>{
    return this.http.get<Ligne>(this.baseUrl+ "/api/ligne/" +id);
  }

  public update(ligne:Ligne):Observable<Ligne>{
    return this.http.put<Ligne>(this.baseUrl+"/api/ligne/" + ligne.id, ligne);
  }

  assignMTToLigne(mtId: number, ligneId: number): Observable<MoyenTransport> {
    const url = `${this.baseUrl}/api/${mtId}/assign-ligne/${ligneId}`;
    return this.http.post<MoyenTransport>(url, null);
  }

  removeMTFromLigne(mtId: number, ligneId: number): Observable<any> {
    const url = `${this.baseUrl}/api/${mtId}/remove-from-ligne/${ligneId}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }


}
