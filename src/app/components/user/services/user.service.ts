import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AppUser} from "../model/user.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {AppRole} from "../../role/model/role.model";

@Injectable({providedIn:"root"})
export class UserService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.baseUrl + '/users');
  }

  searchUsers(query: string): Observable<AppUser[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<AppUser[]>(`${this.baseUrl}/users/search`, {params});
  }

  public save(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl + '/users', user);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/users/" + id);
  }

  public getUserById(id: number|undefined): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + "/users/" + id);
  }

  public getUserByUsername(username: string|undefined): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + "/users/username/" + username);
  }

  public update(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(this.baseUrl + "/users/" + user.userId, user);
  }


  assignUserToMT(userId: number, mtId: number): Observable<AppUser> {
    const url = `${this.baseUrl}/${userId}/assign-to-mt/${mtId}`;
    return this.http.post<AppUser>(url, null);
  }

  removeUserFromMt(userId: number, mtId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}/remove-from-mt/${mtId}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }

  assignRoleToUser(userId: number|undefined, role: string): Observable<AppRole> {
    const url = `${this.baseUrl}/${userId}/add-role/${role}`;
    return this.http.post<AppRole>(url, null);
  }

  removeRoleFromUser(userId: number|undefined, role: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/remove-role/${role}`;
    return this.http.delete(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }
}
