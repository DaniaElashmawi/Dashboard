import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { ProjectsComponent } from './_components/projects/projects.component';
import { CategoriesComponent } from './_components/categories/categories.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { TeamComponent } from './_components/team/team.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HeaderComponent } from './_shared/header/header.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { LoginComponent } from './_components/login/login.component';


// Modules
import { MaterialModule } from './_modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectsComponent,
    CategoriesComponent,
    ProfileComponent,
    TeamComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
