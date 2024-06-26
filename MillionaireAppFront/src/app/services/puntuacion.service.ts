import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Puntuacion } from '../models/puntuacion.model';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {
  private apiUrl = 'http://localhost:5255/api/puntuacion'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }

  obtenerTodas(): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(`${this.apiUrl}/Obtener-todas`)
      .pipe(catchError(this.handleError));
  }

  obtenerPorId(id: number): Observable<Puntuacion> {
    return this.http.get<Puntuacion>(`${this.apiUrl}/Obtener-por?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  crear(puntuacion: Puntuacion): Observable<Puntuacion> {
    return this.http.post<Puntuacion>(`${this.apiUrl}/Crear`, puntuacion)
      .pipe(catchError(this.handleError));
  }

  actualizar(id: number, puntuacion: Puntuacion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Modificar/${id}`, puntuacion)
      .pipe(catchError(this.handleError));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  obtenerMejoresPuntuaciones(): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(`${this.apiUrl}/Obtener-mejores-puntuaciones`)
      .pipe(catchError(this.handleError));
  }
}