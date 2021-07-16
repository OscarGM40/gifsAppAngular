import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css' ]
})
export class SidebarComponent  {

  get gifs() {
    return this.gifsService.historial;
  }

  reenviar( gif: string){
    this.gifsService.buscarGifs(gif);
  }

  async borrar(gif: string, event:any){
    event.stopPropagation();
    await this.gifsService.borrarStorage(gif);

  }

  constructor(private gifsService: GifsService) { }


}
