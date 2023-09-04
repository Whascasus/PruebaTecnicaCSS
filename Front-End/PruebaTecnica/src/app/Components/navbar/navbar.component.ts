import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {}

  mostrarAlerta(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  logout() {
    this.mostrarAlerta("Sesión Finalizada", "Listo");
    this.loginService.logout();
    this.router.navigate(['']);
  }


}
