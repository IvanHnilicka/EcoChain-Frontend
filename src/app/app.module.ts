import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuComponent } from './componentes/side-menu/side-menu.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RegistroOperadorComponent } from './componentes/registro-operador/registro-operador.component';
import { ReciclajeComponent } from './componentes/reciclaje/reciclaje.component';
import { VerUsuarioComponent } from './componentes/ver-usuario/ver-usuario.component';
import { CanjearPuntosComponent } from './componentes/canjear-puntos/canjear-puntos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    RegistroUsuarioComponent,
    NotFoundComponent,
    RegistroOperadorComponent,
    ReciclajeComponent,
    VerUsuarioComponent,
    CanjearPuntosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
