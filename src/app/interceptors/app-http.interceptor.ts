import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AuthService} from "../components/authService/auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url)
    const isAuthRequest = request.url.includes('/auth/login');
    const isUsersPostRequest = request.url.includes('/users') && request.method === 'POST';
    if (!isAuthRequest && !isUsersPostRequest) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      });
      return next.handle(newRequest).pipe(
        catchError(err=>{
          if(err.status==401){
            this.authService.logout();
          }else if (err.status == 403) {
            this.router.navigateByUrl('notAuthorized');
          }else if (err.status == 500) {
            this.router.navigateByUrl('page500');
          }else if (err.status == 404) {
            this.router.navigateByUrl('page404');
          }
          return throwError(err.message)
        })
      );
    }else{
      return next.handle(request)
    }

  }
}
