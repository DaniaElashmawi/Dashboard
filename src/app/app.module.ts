import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { TeamComponent } from './_components/team/team.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HeaderComponent } from './_shared/header/header.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { LoginComponent } from './_components/login/login.component';
import { ProjectsComponent, displayDialog, editDialog } from './_components/projects/projects.component';
import { ServicesComponent, servicedisplayDialog, serviceeditDialog } from './_components/services/services.component';
import { CategoriesComponent, CatEditDialog } from './_components/categories/categories.component';


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
    displayDialog,
    editDialog,
    ProfileComponent,
    TeamComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ServicesComponent,
    servicedisplayDialog,
    serviceeditDialog,
    CategoriesComponent,
    CatEditDialog
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
  bootstrap: [AppComponent],
  entryComponents: [displayDialog, editDialog, serviceeditDialog, servicedisplayDialog, CatEditDialog]

})
export class AppModule { }
