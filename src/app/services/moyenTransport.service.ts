import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MoyenTransport} from "../model/moyenTransport.model";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:"root"})
export class MoyenTransportService{

  constructor(private http:HttpClient) {
  }

  public getMoyensTransport():Observable<MoyenTransport[]>{
    let host="http://localhost:3000";
    return this.http.get<MoyenTransport[]>(host+"/moyenTransports");
  }
  public save(moyentransport:MoyenTransport):Observable<MoyenTransport>{
    let host="http://localhost:3000";
    return this.http.post<MoyenTransport>(host+"/moyenTransports/",moyentransport);
  }

  public delete(id:number):Observable<void>{
    let host="http://localhost:3000";
    return this.http.delete<void>(host+"/moyenTransports/"+id);
  }
}
