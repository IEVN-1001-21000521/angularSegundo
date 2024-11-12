import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumnosutl } from './interfaces/alumnosutl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  constructor(private http: HttpClient) { }

  public getAlumnos(): Observable<Alumnosutl[]> {
    return this.http.get<Alumnosutl[]>('http://127.0.0.1:5000/alumnos');
  }

  agregarNuevoAlumno(datos: Alumnosutl): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/alumnos', datos);
  }

  public getAlumno(mat: number): Observable<Alumnosutl> {
    console.log(mat);
    return this.http.get<Alumnosutl>('http://127.0.0.1:5000/alumnos/' + mat);
  }

  modificarAlumno(mat: number, datos: Alumnosutl): Observable<any> {
    return this.http.put('http://127.0.0.1:5000/alumnos/' + mat, datos);
  }

  public EliminaAlumno(mat: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:5000/alumnos/' + mat);
  }
}
