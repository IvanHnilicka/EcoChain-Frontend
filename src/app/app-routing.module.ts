import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RegistroOperadorComponent } from './componentes/registro-operador/registro-operador.component';
import { ReciclajeComponent } from './componentes/reciclaje/reciclaje.component';
import { VerUsuarioComponent } from './componentes/ver-usuario/ver-usuario.component';
import { CanjearPuntosComponent } from './componentes/canjear-puntos/canjear-puntos.component';

const routes: Routes = [
  {
    component: RegistroUsuarioComponent,
    path: 'registro/usuario'
  },
  {
    component: RegistroOperadorComponent,
    path: 'registro/operador'
  },
  {
    component: ReciclajeComponent,
    path: 'reciclaje'
  },
  {
    component: VerUsuarioComponent,
    path: 'usuario'
  },
  {
    component: CanjearPuntosComponent,
    path: 'canjear'
  },
  {
    component: ReciclajeComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
