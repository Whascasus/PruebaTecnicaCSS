import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
 
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profesores} from '../interfaces/Profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "profesores/";

  constructor(private http:HttpClient) { }

  getList():Observable<Profesores[]>{
    return this.http.get<Profesores[]>(`${this.apiUrl}lista`);
  }

  getProfesor(IdProfesor: number):Observable<Profesores>{
    return this.http.get<Profesores>(`${this.apiUrl}getProfesor/${IdProfesor}`);
  }

  add(modelo:Profesores):Observable<Profesores>{
    return this.http.post<Profesores>(`${this.apiUrl}guardar`,modelo);
  }

  update(IdProfesor:number, modelo:Profesores):Observable<Profesores>{
    return this.http.put<Profesores>(`${this.apiUrl}actualizar/${IdProfesor}`,modelo);
  }

  delete(IdProfesor:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${IdProfesor}`);
  }

}
 