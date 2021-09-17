import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listarUsuarios() {
    return this.http.get(`${base_url}/usuarios`);
  }

  crearUsuario(usuario: Usuario){
    return this.http.post(`${base_url}/crearusuario`, usuario);
  }

  eliminarUsuario(id: number){
    const headers = new HttpHeaders()
            .set('id_usuario', id.toString());
    this.http.delete(`${base_url}/eliminarusuario`, {headers})
      .subscribe(data => {
        console.log('esto imprime el eliminar: ', data)
      })
  }

  actualizarUsuario(usuario: Usuario){
    return this.http.put(`${base_url}/actualizarusuario`, usuario);
  }


}
