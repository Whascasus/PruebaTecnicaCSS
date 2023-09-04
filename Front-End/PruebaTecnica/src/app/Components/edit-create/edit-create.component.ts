import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Profesores } from '../../interfaces/Profesores';
import { ProfesoresService } from '../../Services/profesores.service';

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html',
  styleUrls: ['./edit-create.component.css']
})
export class EditCreateComponent implements OnInit {

  formProfesores: FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "Guardar";
  Identificacion:number = 0;
  TipoIdentificacion:number = 0;
  Nombres?:string = "";
  Apellidos?:string = "";
  CorreoElectronico?:string = "";
  TelefonoCelular:number = 0;
  NumeroContrato:number = 0;
  CiudadResidencia?:string | null;
  EscalafonTecnico:number = 0;
  EscalafonExtension:number  = 0;

  constructor(
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute,
    private _ProfesoresService: ProfesoresService,
    ){

      this.formProfesores = new FormGroup({
        TipoIdentificacion: new FormControl('', [Validators.required]),
        Identificacion: new FormControl('', [Validators.required]),
        Nombres: new FormControl('', [Validators.required]),
        Apellidos: new FormControl('', [Validators.required]),
        CorreoElectronico: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        TelefonoCelular: new FormControl('', [Validators.required]),
        NumeroContrato: new FormControl('', [Validators.required]),
        CiudadResidencia: new FormControl(''),
        EscalafonTecnico: new FormControl('', [Validators.required]),
        EscalafonExtension: new FormControl('', [Validators.required]),
        
      });

      this.Identificacion = Number(this.route.snapshot.paramMap.get('identificacion'));
      this.TipoIdentificacion = Number(this.route.snapshot.paramMap.get('tipoIdentificacion'));
      this.Nombres = this.route.snapshot.paramMap.get('nombres')?.toString();
      this.Apellidos = this.route.snapshot.paramMap.get('apellidos')?.toString();
      this.CorreoElectronico = this.route.snapshot.paramMap.get('correoElectronico')?.toString();
      this.TelefonoCelular = Number(this.route.snapshot.paramMap.get('telefonoCelular'));
      this.NumeroContrato = Number(this.route.snapshot.paramMap.get('numeroContrato'));
      this.CiudadResidencia = this.route.snapshot.paramMap.get('ciudadResidencia')?.toString();
      this.EscalafonTecnico = Number(this.route.snapshot.paramMap.get('escalafonTecnico'));
      this.EscalafonExtension = Number(this.route.snapshot.paramMap.get('escalafonExtension'));

      console.log(this.EscalafonExtension);

    }

    mostrarAlerta(msg: string, action: string) {
      this._snackBar.open(msg, action, {
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      });
    }

    addEditProfesor(){

      console.log(this.formProfesores);
      
      const modelo : Profesores ={
        TipoIdentificacion: this.formProfesores.value.TipoIdentificacion,
        Identificacion: this.formProfesores.value.Identificacion,
        Nombres: this.formProfesores.value.Nombres,
        Apellidos: this.formProfesores.value.Apellidos,
        CorreoElectronico: this.formProfesores.value.CorreoElectronico,
        TelefonoCelular: this.formProfesores.value.TelefonoCelular,
        NumeroContrato: this.formProfesores.value.NumeroContrato,
        CiudadResidencia: this.formProfesores.value.CiudadResidencia,
        EscalafonTecnico: this.formProfesores.value.EscalafonTecnico,
        EscalafonExtension: this.formProfesores.value.EscalafonExtension

      }

      console.log(modelo);

      if(this.Identificacion !=0 )
        this.update(modelo);
      else
        this.add(modelo);

    }

    add(modelo:any){
      this._ProfesoresService.add(modelo).subscribe({
        next:(data)=> {
          this.mostrarAlerta("Docente Fue creado", "Listo");
          this.Home();
        },error:(e)=>{
          this.mostrarAlerta("no se puedo crear","Error")
        }
      })
    }

    update(modelo:any){
      this._ProfesoresService.update(this.Identificacion, modelo).subscribe({
        next:(data)=> {
          this.mostrarAlerta("Docente Fue Actualizado", "Listo");
          this.Home();
        },error:(e)=>{
          this.mostrarAlerta("no se puede actualizar","Error")
        }
      })
    }

    Home(){
      this.router.navigate(['home'])
    }


  ngOnInit(): void {
    
    if (this.Identificacion != 0) {
      this.tituloAccion = "EDITAR";
      this.botonAccion = "Actualizar";
      this.ObtenerProfesor();
    }else{
      this.formProfesores.get('tipoDocumento')?.setValue(0);
    }
  }

  ObtenerProfesor() 
  {

    console.log(this.EscalafonExtension);

    this.formProfesores.controls['TipoIdentificacion'].setValue(this.TipoIdentificacion);
    this.formProfesores.controls['Identificacion'].setValue(this.Identificacion);
    this.formProfesores.controls['Nombres'].setValue(this.Nombres);
    this.formProfesores.controls['Apellidos'].setValue(this.Apellidos);
    this.formProfesores.controls['CorreoElectronico'].setValue(this.CorreoElectronico);
    this.formProfesores.controls['TelefonoCelular'].setValue(this.TelefonoCelular);
    this.formProfesores.controls['NumeroContrato'].setValue(this.NumeroContrato);
    this.formProfesores.controls['CiudadResidencia'].setValue(this.CiudadResidencia);
    this.formProfesores.controls['EscalafonTecnico'].setValue(this.EscalafonTecnico);
    this.formProfesores.controls['EscalafonExtension'].setValue(this.EscalafonExtension);

  }

  get Email(){
    return this.formProfesores.get('CorreoElectronico')
    }

}
