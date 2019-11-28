export const sexoEnum = {
    hombre: 'Hombre', 
    mujer: "Mujer", 
    otro: "Otro", 
    noEspecificado: "No especificado"}

export class Persona { 
    id: number;   
    nombre: string;
    apellidos: string;
    edad: number;
    dni: string;
    cumple: string;
    color: string;
    sexo: any; 
    
    //Constructor base
    constructor(id: number, nombre: string, apellidos: string, edad: number, dni: string, sexo: string, cumple: string, color?: string){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.dni = dni;
        if (sexo == "Hombre")
            this.sexo = sexoEnum.hombre;
        else if (sexo == "Mujer")
            this.sexo = sexoEnum.mujer;
        else if (sexo == "Otro")
            this.sexo = sexoEnum.otro;
        else
            this.sexo = sexoEnum.noEspecificado
        this.cumple = cumple;
        this.color = color;
    }
}
