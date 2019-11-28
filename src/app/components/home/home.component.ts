import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Persona } from 'src/app/classes/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  persona : FormGroup;        //Formulario de personas
  selectedPerson: Persona;    //Persona a la que corresponde el formulario
  private editar : boolean;   //Indica si queremos editar una persona existente o añadir una nueva
  personaAnterior : Persona;  //Valor de la persona antes de realizar las modificaciones

  constructor(private personasService: PersonasService, route: ActivatedRoute, private router : Router) {
    let id: any;
    route.queryParams.subscribe(params => id = params.id);
    try {

      /* Si se le ha pasado una persona por parámetro (al pulsar el botón editar) */
      /* Carga en el formulario los valores de la persona seleccionada            */

      this.selectedPerson = personasService.getPersona(id);
      console.log(this.selectedPerson.cumple);
      this.persona = new FormGroup({
        id: new FormControl(this.selectedPerson.id),
        nombre: new FormControl(this.selectedPerson.nombre, [Validators.minLength(3), Validators.required]),
        apellidos: new FormControl(this.selectedPerson.apellidos, [Validators.minLength(3), Validators.required]),
        edad: new FormControl(this.selectedPerson.edad, [Validators.min(0), Validators.max(125), Validators.required]),
        dni: new FormControl(this.selectedPerson.dni, [Validators.maxLength(9), Validators.minLength(8), Validators.required]),
        cumple: new FormControl(new Date(this.selectedPerson.cumple), Validators.required),
        color: new FormControl(this.selectedPerson.color, [Validators.minLength(3), Validators.required]),
        sexo: new FormControl(this.selectedPerson.sexo, Validators.required)
      });
      this.editar = true;

      /* personaAnterior => Almacena el valor de la persona antes de ser modificada 
      ** para devolverla en caso de que el usuario pulse cancelar */
      this.personaAnterior = new Persona(this.selectedPerson.id, this.selectedPerson.nombre, this.selectedPerson.apellidos, 
                                        this.selectedPerson.edad, this.selectedPerson.dni, this.selectedPerson.sexo, 
                                        this.selectedPerson.cumple, this.selectedPerson.color);
    } catch {

      /* Si el id pasado por parámetro no corresponde a una persona existente (botón añadir) */
      /* Crea una persona con el id pasado por parámetro */

      this.selectedPerson = new Persona(id, '', '', null , '', '', '', '');
      this.persona = new FormGroup({
        id: new FormControl(id),
        nombre: new FormControl('', [Validators.minLength(3), Validators.required]),
        apellidos: new FormControl('', [Validators.minLength(3), Validators.required]),
        edad: new FormControl('', [Validators.min(0), Validators.max(125), Validators.required]),
        dni: new FormControl('', [Validators.maxLength(9), Validators.minLength(8), Validators.required]),
        cumple: new FormControl('', Validators.required),
        color: new FormControl('', [Validators.minLength(3), Validators.required]),
        sexo: new FormControl('', Validators.required)
      });
      this.editar = false;
    }
    
  }

  /* Sustituir los valores de la persona actual por los de la persona anterior */
  private volver(){
    this.persona.setValue({
      id: this.personaAnterior.id,
      nombre: this.personaAnterior.nombre, 
      apellidos: this.personaAnterior.apellidos,
      edad: this.personaAnterior.edad,
      dni: this.personaAnterior.dni,
      cumple: this.personaAnterior.cumple,
      color: this.personaAnterior.color,
      sexo: this.personaAnterior.sexo});
  }
  
  /* Llama al método volver(), cancelando la edición, y cierra el formulario */
  cancelar(){
    if (this.editar){
      this.volver();
    }
    this.router.navigate(['/']);
  }

  /* Comprueba que no existe ningún error en los parámetros 
     Si hay un error, se termina la ejecución para no permitir introducir personas con datos incorrectos 
     Si no hay error, se comprueba si se está editando o añadiendo una persona nueva 
     Si no estamos editando, añadimos la persona a la lista. 
     Si estamos editando, se ignora esta función y se cierra el formulario */
  onSubmit(){
    if(this.persona.controls['nombre'].hasError('minlength') || this.persona.controls['nombre'].hasError('required') ||
      this.persona.controls['apellidos'].hasError('minlength') || this.persona.controls['apellidos'].hasError('required') ||
      this.persona.controls['edad'].hasError('min') || this.persona.controls['edad'].hasError('max') || this.persona.controls['edad'].hasError('required') ||
      this.persona.controls['dni'].hasError('minlength') || this.persona.controls['dni'].hasError('maxlength') ||this.persona.controls['dni'].hasError('required') ||
      this.persona.controls['cumple'].hasError('required') ||
      this.persona.controls['color'].hasError('minlength') || this.persona.controls['color'].hasError('required')){
        return;
    }
    if(!this.editar){
      this.personasService.addPersona(this.persona.value);
    }

    this.router.navigate(['/']);
    
  } 

  /* Devuelve el mensaje correspondiente al error pasado por parámetro como string */
  mensajeError(error: string) : string {
    switch(error){
      case "minlength": return "Mínimo 3 caracteres";
      case "required": return "El campo no puede estar vacío";
      case "edad": return "Debe estar entre 0-125";
      case "dni": return "El DNI debe tener 9 dígitos";
      default: return "Error";
    }
  }

  ngOnInit() { 
  }

}
