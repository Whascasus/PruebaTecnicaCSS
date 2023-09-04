import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { EditCreateComponent } from './Components/edit-create/edit-create.component';
import { AuthGuard } from './guards.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create', component: EditCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:identificacion/:tipoIdentificacion/:nombres/:apellidos/:correoElectronico/:telefonoCelular/:numeroContrato/:ciudadResidencia/:escalafonTecnico/:escalafonExtension', component: EditCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }