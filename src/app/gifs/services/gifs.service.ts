import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string []= [];
  private API_URL: string = 'https://api.giphy.com/v1/gifs';
  private API_KEY: string = 'X6XsNTXcIJUAig1WpnwntQlh673hx11Q';

  public respuesta: Gif[]= [];
  
  // ojo que el getter y la propiedad no se pueden llamar igual
  get historial(){
    return [ ...this._historial ];
  }

  buscarGifs( termino:string ){
    termino = termino.trim().toLocaleLowerCase();

    if(!this.historial.includes(termino)){
      this._historial.unshift(termino);
      this._historial = this._historial.slice(0,10);
      localStorage.setItem('historialReplica',JSON.stringify(this._historial));
      
    }
    
    // vienen de la API giphy
    const requestParams = new HttpParams()
    .set('api_key',this.API_KEY)
      .set('limit',10)
      .set('q',termino);

    this.http.get<SearchGifsResponse>(`${this.API_URL}/search`,{ params:requestParams })
    .subscribe( ( resp ) => {
        this.respuesta =  resp.data;
        localStorage.setItem('resultadosReplica',JSON.stringify(this.respuesta))
      },console.info)
      
  } // fin buscarGifs

  async borrarStorage(termino:string) {
      
      this._historial = this._historial.filter(x => x !== termino);
     
      if(this._historial.length == 0)
      {
        localStorage.setItem('resultadosReplica',JSON.stringify([]))
        await new Promise((res) => setTimeout(res,500));
        window.location.reload();
      }
      localStorage.setItem('historialReplica',JSON.stringify(this._historial));
  }  

  
  constructor(private http: HttpClient) { 
    this._historial = JSON.parse(localStorage.getItem('historialReplica')!) || [];
    this.respuesta = JSON.parse(localStorage.getItem('resultadosReplica')!) || [];
  }
}
