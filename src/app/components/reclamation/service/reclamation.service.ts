import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {District} from "../../district/model/district.model";
import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {catchError} from "rxjs/operators";
import {Reclamation} from "../model/reclamation.model";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

@Injectable({providedIn:"root"})
export class ReclamationService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http:HttpClient) { }

  public getReclamations():Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.baseUrl + '/api/reclamation');
  }
  /*searchReclamations(query: string): Observable<Reclamation[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/search`, { params });
  }*/
  public save(reclamation:Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamation',reclamation);
  }
  public saveReclamation(reclamationData: Reclamation): Promise<number> {
    return this.http.post<any>(this.baseUrl+ '/api/reclamation', reclamationData)
      .toPromise()
      .then(response => response.id)
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de la réclamation :', error);
        throw error;
      });
  }
  /*saveReclamationWithPhotos(reclamation: Reclamation, photos: File[]): Observable<Reclamation> {
    const formData: FormData = new FormData();
    formData.append('reclamation', JSON.stringify(reclamation));
    photos.forEach((photo, index) => {
      formData.append('photo' + index, photo);
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };

    return this.http.post<Reclamation>(`${this.baseUrl}/api/reclamation-with-photos`, formData, httpOptions);
  }*/
  /*createReclamation(formData: FormData): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.baseUrl+ '/api/reclamationWithPhotos', formData);
  }*/
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

  generateReport(format: string, query: string,fromDate: NgbDate | null, toDate: NgbDate | null,typeAccidentIncident:string,typeDegat:string): Observable<any> {
    const fromDateString = this.formatNgbDateToString(fromDate);
    const toDateString = this.formatNgbDateToString(toDate);
    return this.http.get<any>(`${this.baseUrl}/api/reclamation-report?format=${format}&query=${query}&fromDate=${fromDateString}&toDate=${toDateString}&typeAccidentIncident=${typeAccidentIncident}&typeDegat=${typeDegat}`);
  }

  generateReportWithoutDate(format: string, query: string,typeAccidentIncident:string,typeDegat:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/reclamation-report-without-date?format=${format}&query=${query}&typeAccidentIncident=${typeAccidentIncident}&typeDegat=${typeDegat}`);
  }

  /*searchReclamationsByDateRange(fromDate: NgbDate | null, toDate: NgbDate | null): Observable<Reclamation[]> {
    const fromDateString = this.formatNgbDateToString(fromDate);
    const toDateString = this.formatNgbDateToString(toDate);
    const params = new HttpParams().set('fromDate', fromDateString).set('toDate', toDateString);
    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/searchByDateRange`, { params });
  }*/

  /*searchReclamationsByTypes(typeAccidentIncident: string, typeDegat: string): Observable<Reclamation[]> {
    const params = new HttpParams().set('typeAccidentIncident', typeAccidentIncident).set('typeDegat', typeDegat);
    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/searchByTypes`, { params });
  }*/

  private formatNgbDateToString(date: NgbDate | null): string {
    if (date) {
      return `${date.year}-${this.padZero(date.month)}-${this.padZero(date.day)}`;
    }
    return '';
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  searchReclamationsGlobal(query:string,fromDate: NgbDate | null, toDate: NgbDate | null, typeAccidentIncident: string, typeDegat: string): Observable<Reclamation[]> {
    const fromDateString = this.formatNgbDateToString(fromDate);
    const toDateString = this.formatNgbDateToString(toDate);
    const params = new HttpParams()
      .set('query',query)
      .set('fromDate', fromDateString)
      .set('toDate', toDateString)
      .set('typeAccidentIncident', typeAccidentIncident)
      .set('typeDegat', typeDegat);

    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/searchGlobal`, { params });
  }

  searchReclamationsWithoutDateRange(query:string, typeAccidentIncident: string, typeDegat: string): Observable<Reclamation[]> {
    const params = new HttpParams()
      .set('query',query)
      .set('typeAccidentIncident', typeAccidentIncident)
      .set('typeDegat', typeDegat);

    return this.http.get<Reclamation[]>(`${this.baseUrl}/api/reclamation/searchReclamationWithoutDateRange`, { params });
  }
}
