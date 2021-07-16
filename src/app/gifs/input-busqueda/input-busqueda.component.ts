import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-input-busqueda',
  templateUrl: './input-busqueda.component.html',
  styles: [
  ]
})
export class InputBusquedaComponent {

  @ViewChild('txtBuscar') busqueda!: ElementRef<HTMLInputElement>;


  buscar( ) {
    const termino = this.busqueda.nativeElement.value;

    if(termino != ""){
      this.gifsService.buscarGifs( termino );
    }
    this.busqueda.nativeElement.value = "";
  }
  
  constructor( private gifsService: GifsService ) { }

}
