import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Profesores } from '../../interfaces/Profesores';
import { ProfesoresService } from '../../Services/profesores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['Acciones', 'Identificacion', 'NombresyApellidos', 'CorreoElectronico', 'N°Contrato', 'EscalafonTecnico'];
  dataSource = new MatTableDataSource<Profesores>();

  constructor(private _profesoresServicio: ProfesoresService,
    private dialog: MatDialog,
    private router:Router,
    private _snackBar:MatSnackBar,
  ){

  }

  ngOnInit(): void {
    this.mostrarProfesores();
  }

  Create(){
    this.router.navigate(['create']);
  }

  Edit(identificacion: number){

    this.router.navigate(['/edit-create'], { queryParams: { identificacion  } });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarProfesores(){
    this._profesoresServicio.getList().subscribe({
      next:(dataResponse)=> {
        console.log(dataResponse)
        this.dataSource.data = dataResponse
      },error:(e)=>{}
    })
  }

  mostrarAlerta(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }


  Delete(identificacion: number){
    this._profesoresServicio.delete(identificacion).subscribe({
      next:(data)=>{
        this.mostrarProfesores();
        this.router.navigate(['home']);
        this.mostrarAlerta("Docente Fue Eliminado", "Listo");
      },
      error:(e)=>{console.log(e)}
    })

  }

  
}
