import { Opcionesrespuestas } from './opcionesrespuestas.model';

export interface Preguntas {
    preguntaID: number;
    enunciado: string;
    categoria: string;
    nivel: number;
    opcionesRespuesta: Opcionesrespuestas[];
}
