import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistreComponent } from './auth/registre/registre.component';
import { routesDashboard } from './dashboard/dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegistreComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: routesDashboard,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
