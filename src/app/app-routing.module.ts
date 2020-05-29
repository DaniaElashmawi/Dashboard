import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './_components/categories/categories.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { ProjectsComponent } from './_components/projects/projects.component';
import { LoginComponent } from './_components/login/login.component';
import { TeamComponent } from './_components/team/team.component';
import { GuardGuard } from './_authentication/guard.guard';
import { LayoutComponent } from './_layouts/layout/layout.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: LayoutComponent, canActivate: [GuardGuard],
  children: [
    {
      path: '',
      component: DashboardComponent,
      children: [
        {
          path: 'categories', component: CategoriesComponent
        },
        {
          path: 'projects', component: ProjectsComponent
        },
        {
          path: 'profile', component: ProfileComponent
        },
        {
          path: 'team', component: TeamComponent
        }
      ]
    }
  ]
},
{ path: '**', component: LoginComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
