import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logins } from '../../interfaces/Logins';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private Authenticated: boolean = false;
  user : any;
  formLogin: FormGroup;
  usuario: string = '';
  contrasena: string = '';

  constructor(private loginService: LoginService,
    private router:Router,
    private _snackBar:MatSnackBar,
    private fb:FormBuilder,
    ) {
      this.formLogin = this.fb.group({
        Usuario: ['', Validators.required],
        Contrasena: ['', Validators.required]
      });
    }

    mostrarAlerta(msg: string, action: string) {
      this._snackBar.open(msg, action, {
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      });
    }

    login() {

      console.log(this.formLogin);
      
      const modelo : Logins ={
        Usuario: this.formLogin.value.Usuario,
        Contrasena: this.formLogin.value.Contrasena
      }

      console.log(modelo);

      this.loginService.login(modelo).subscribe({
        next:(result)=>{
          this.Authenticated = true;
          this.mostrarAlerta("Ingreso Correctamente", "Listo");
          this.loginService.Auth(this.Authenticated);
          this.router.navigate(['home'])
  
        },error:(e)=>{
          this.Authenticated = false;
          this.mostrarAlerta("Usuario o Contraseña Incorrectos","Error")
          this.loginService.Auth(this.Authenticated);
          this.router.navigate([''])
        }
         
      });

    }
}
