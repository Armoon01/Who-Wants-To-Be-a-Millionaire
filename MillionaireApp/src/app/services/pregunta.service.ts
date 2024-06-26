import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Preguntas } from '../models/preguntas.model';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private apiUrl = 'https://localhost:5001/api/preguntas'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }

  obtenerTodas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.apiUrl}/obtener-todas`)
      .pipe(catchError(this.handleError));
  }

  obtenerPorId(id: number): Observable<Preguntas> {
    return this.http.get<Preguntas>(`${this.apiUrl}/Obtener-por/${id}`)
      .pipe(catchError(this.handleError));
  }

  crear(pregunta: Preguntas): Observable<Preguntas> {
    return this.http.post<Preguntas>(`${this.apiUrl}/Crear`, pregunta)
      .pipe(catchError(this.handleError));
  }

  actualizar(id: number, pregunta: Preguntas): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Modificar/${id}`, pregunta)
      .pipe(catchError(this.handleError));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }
  obtenerPorDif(id: number): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.apiUrl}/Obtener-por-dif/${id}`)
      .pipe(catchError(this.handleError));
  }
}