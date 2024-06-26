import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5255/api/usuario'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }

  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/Obtener-todos`)
      .pipe(catchError(this.handleError));
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/Obtener/${id}`)
      .pipe(catchError(this.handleError));
  }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/Crear`, usuario)
      .pipe(catchError(this.handleError));
  }

  actualizar(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Modificar/${id}`, usuario)
      .pipe(catchError(this.handleError));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }
}