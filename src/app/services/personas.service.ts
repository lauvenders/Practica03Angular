import { Injectable, Output, EventEmitter } from '@angular/core';
import { Persona } from "../classes/persona";
import { Observable, of } from 'rxjs';
import { PERSONAS } from './personas'

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor() {
  }

  /* Devuelve un observador a la lista de personas */
  public getPersonas() : Observable<Persona[]> {
    return of (PERSONAS);
  };

  /* Devuelve la persona con el id especificado */
  public getPersona(id: number) : Persona {
    return PERSONAS[id - 1];
  }

  /* Elimina la persona de la lista */
  public borrarPersona(id: number){
    if (id-1 !== -1) {
        PERSONAS.splice(id-1, 1);
    }
    console.log(PERSONAS);
  }

  /* Añade una persona a la lista */
  public addPersona(persona: Persona) {
    PERSONAS.push(persona);
  }
  
}
