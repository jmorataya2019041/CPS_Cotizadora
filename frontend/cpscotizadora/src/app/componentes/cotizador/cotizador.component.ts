import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CotizadoraService } from 'src/app/services/cotizadora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
  providers: [CotizadoraService]
})
export class CotizadorComponent implements OnInit {
  public getPaises = [];
  public descuentoCliente;
  constructor(public _cotizadoraService: CotizadoraService, public router: Router) { }

  cotizacion = {
    peso: '',
    alto: '',
    largo: '',
    ancho: '',
    pais_origen: '',
    pais_destino: '',
    region: 0,
    rol: '',
    descuento: 0
  }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  //Obtener los países
  obtenerPaises(){
    this._cotizadoraService.obtenerPaises().subscribe(
      response => {
        this.getPaises = response.paises;
        console.log(this.getPaises);
      },
      error => {
        console.log(error);

      }
    )
  }

  //Hacer la cotización
  cotizar(){
    this._cotizadoraService.cotizador(this.cotizacion).subscribe(
      response => {
        console.log(response);
        if(this.cotizacion.rol === '0'){
          Swal.fire('Cotización', "Tarifa Cliente Estándar: Q"+response.descuento,'success')
        }else{
          Swal.fire('Cotización', "Decuento hecho: Q"+response.descuento,'success')
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
