import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Preguntas } from '../models/preguntas.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private apiUrl = 'http://localhost:5255/api/preguntas'; // Ajusta la URL según tu configuración
  private preguntaId2Source = new BehaviorSubject<number | null>(null);
  preguntaId2$ = this.preguntaId2Source.asObservable();
  private preguntaIdSource = new BehaviorSubject<number | null>(null);
  preguntaId$ = this.preguntaId2Source.asObservable();

  constructor(private http: HttpClient) { }

  actualizarPreguntaId2(id: number) {
    this.preguntaId2Source.next(id);
  }

  actualizarPreguntaCorrecta(id: number) {
    let number = this.preguntaIdSource.getValue();
    if (number != null) {
      this.preguntaIdSource.next(number + id);
    }
  }

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
    return this.http.get<Preguntas[]>(`${this.apiUrl}/Obtener-por-dif?dif=${id}`)
      .pipe(catchError(this.handleError));
  }
}