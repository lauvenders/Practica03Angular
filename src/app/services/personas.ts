import { Persona, sexoEnum } from "../classes/persona"

export const PERSONAS: Persona[] = [
    {id: 1, nombre: "Laura", apellidos: "García", edad: 12, dni: "00000000G", cumple: "2010-03-18", color: "Verde", sexo: sexoEnum.mujer},
    {id: 2, nombre: "Ana", apellidos: "López", edad: 20, dni: "00000000G", cumple: "1999-03-09", color: "Rosa", sexo: sexoEnum.otro}
];