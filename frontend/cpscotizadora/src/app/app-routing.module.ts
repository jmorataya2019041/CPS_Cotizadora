import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CotizadorComponent} from './componentes/cotizador/cotizador.component';

const routes: Routes = [
  {path: 'cotizador', component: CotizadorComponent},
  {path: '**', component: CotizadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
