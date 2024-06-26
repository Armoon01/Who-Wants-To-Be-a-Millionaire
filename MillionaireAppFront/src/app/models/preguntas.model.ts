import { Opcionesrespuestas } from './opcionesrespuestas.model';

export interface Preguntas {
    preguntaID: number;
    textoPregunta: string;
    categoria: string;
    nivel: number;
    opcionesRespuesta: Opcionesrespuestas[];
}

