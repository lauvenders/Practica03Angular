import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PersonasService } from "src/app/services/personas.service"
import { Persona } from "src/app/classes/persona"
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  providers: [ListaComponent],
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  //Nombres de las columnas mostradas
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'edad', 'dni', 'cumple', 'sexo', 'color'];
  
  //Índice de la columna seleccionada
  selectedRowIndex: number = -1;
  
  //Variable que apunta a la tabla de personas
  @ViewChild(MatTable, {static: true}) table : MatTable<Persona>;

  //Array de las personas a mostrar
  dataSource: Persona[];

  //Número de personas en la tabla
  index : number;

  //Aux
  cd : any;

  constructor(private personasService: PersonasService, private router: Router, cd: ChangeDetectorRef) {
    this.cd = cd;
  }

  /* Actualiza el valor selectedRowIndex con el valor del índice de la 
     persona correspondiente a la fila pasada por parámetro */
  select(row: Persona) {
    //console.log(row);
    this.selectedRowIndex = row.id;
  }

  /* Si no se ha seleccionado ninguna persona, muestra un mensaje de alerta
     En caso contrario, abre la ventana home pasando por parámetro el id de la persona seleccionada */
  editarPersona() {
    if (this.selectedRowIndex == -1) {
      window.alert("Seleccione una persona");
      return;
    }
    this.router.navigate(['/home'], { queryParams: { 'id': this.selectedRowIndex } });
  }

  /* Si no se ha seleccionado ninguna persona, muestra un mensaje de alerta.
     En caso contrario, muestra un diálogo de confirmación en el navegador
     Si el usuario acepta, elimina la persona de la base de datos y actualiza la tabla */
  eliminarPersona() {
    //console.log(this.add);
    if (this.selectedRowIndex == -1) {
      window.alert("Seleccione una persona");
      return;
    }
    if (confirm("¿Quieres eliminar?")) {
      this.personasService.borrarPersona(this.selectedRowIndex);
      this.dataSource = this.dataSource.filter(item => item.id != this.selectedRowIndex);
    }
  }

  /* Actualiza la lista de personas */
  getPersonas() {
    this.personasService.getPersonas()
      .subscribe(dataSource => this.dataSource = dataSource);
  }

  /* Navega al componente home pasándole como parámetro el id que tendrá la nueva persona */
  addPersona() {
    this.router.navigate(['/home'], { queryParams: { 'id': this.index + 1 } });
  }

  public ngOnInit() {
    this.getPersonas();
  }

  /* Actualizar la lista de personas */
  ngDoCheck() {
    if (this.dataSource.length !== this.index) {
       this.cd.markForCheck();
       this.index = this.dataSource.length;
       this.getPersonas();
       try { this.table.renderRows(); }
       catch { };
    }
 }

  /* Convierte un string de fecha en formato "aaaa-mm-dd" al formato "dd/mm/aaaa" */
  private printFecha(s : string) : string {
    let aux = s.split("-");
    return aux[2] + "/" + aux[1] + "/" + aux[0];
  }

}

