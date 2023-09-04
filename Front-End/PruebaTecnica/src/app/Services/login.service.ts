import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
 
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject } from 'rxjs';
import { Logins } from '../interfaces/Logins';
import { AuthGuard } from '../guards.guard';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Authenticated = new BehaviorSubject<boolean>(false);
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "Login/";

  constructor(private http:HttpClient
    ) { }

  login(modelo:Logins):Observable<Logins>{
    return this.http.post<Logins>(`${this.apiUrl}`,modelo);

  }
  
  logout(): void {
    this.Authenticated.next(false);
  }

  Auth(Authenticated: boolean) {
    this.Authenticated.next(Authenticated);

    return Authenticated;
  }

  isAuthenticated():Observable<boolean>  {
    return this.Authenticated.asObservable();
  }
  
}
 