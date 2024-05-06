import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AppUser} from "../../user/model/user.model";
import {catchError} from "rxjs/operators";
import {AppRole} from "../model/role.model";
import {District} from "../../district/model/district.model";

@Injectable({providedIn:"root"})
export class RoleService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getRoles():Observable<AppRole[]>{
    return this.http.get<AppRole[]>(this.baseUrl + '/roles');
  }
  searchRoles(query: string): Observable<AppRole[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<AppRole[]>(`${this.baseUrl}/roles/search`, { params });
  }
}
