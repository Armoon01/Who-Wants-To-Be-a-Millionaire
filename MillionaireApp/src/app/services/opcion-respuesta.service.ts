import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Opcionesrespuestas } from '../models/opcionesrespuestas.model';

@Injectable({
  providedIn: 'root'
})
export class OpcionRespuestaService {
  private apiUrl = 'https://localhost:5001/api/opcionRespuesta'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }

  obtenerTodas(): Observable<Opcionesrespuestas[]> {
    return this.http.get<Opcionesrespuestas[]>(`${this.apiUrl}/obtener-todos`)
      .pipe(catchError(this.handleError));
  }

  obtenerPorId(id: number): Observable<Opcionesrespuestas> {
    return this.http.get<Opcionesrespuestas>(`${this.apiUrl}/Obtener-por/${id}`)
      .pipe(catchError(this.handleError));
  }

  crear(opcionRespuesta: Opcionesrespuestas): Observable<Opcionesrespuestas> {
    return this.http.post<Opcionesrespuestas>(`${this.apiUrl}/Crear`, opcionRespuesta)
      .pipe(catchError(this.handleError));
  }

  actualizar(id: number, opcionRespuesta: Opcionesrespuestas): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Modificar/${id}`, opcionRespuesta)
      .pipe(catchError(this.handleError));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  obtenerPorPregunta(preguntaId: number): Observable<Opcionesrespuestas[]> {
    return this.http.get<Opcionesrespuestas[]>(`${this.apiUrl}/Obtener-todas-por/${preguntaId}`)
      .pipe(catchError(this.handleError));
  }
}
