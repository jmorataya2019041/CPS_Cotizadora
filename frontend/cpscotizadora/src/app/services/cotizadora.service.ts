import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Global} from './Global.service';

@Injectable({
  providedIn: 'root'
})
export class CotizadoraService {
  public url: String;

  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  //Función para obtener los países
  obtenerPaises(){
    return this._http.get<any>(this.url + "/paisesDestino");
  }

  //Función para hacer la cotización
  cotizador(cotizadora: any){
    return this._http.post<any>(this.url + '/cotizar', cotizadora);
  }

}
