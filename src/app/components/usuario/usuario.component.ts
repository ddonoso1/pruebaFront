import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol/rol.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

import {MatTableDataSource} from '@angular/material/table';

import { NgForm  } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsuarioComponent implements OnInit {

  columnsToDisplay = ['id_usuario', 'id_rol', 'nombre', 'activo'];
  expandedElement: Usuario | null;

  roles: Roles[] = [];
  usuarios: MatTableDataSource<Usuario>;
  usuario: Usuario = new Usuario();

  constructor(private rolService: RolService, private usuarioService: UsuarioService, 
              private modalService: NgbModal) {
    this.listarRoles();
    this.listarUsuarios();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();
  }

  openInsert(content:any) { 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  
  }

  openPut(content:any, usuario?: Usuario) { 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.usuario = usuario;
    console.log(usuario);
  
  }


  listarRoles() {
    this.rolService.listarRoles()
      .subscribe((data:any) => {
          this.roles = data.data;
          console.log(this.roles);
    });
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios()
      .subscribe((data:any) => {
          this.usuarios = new MatTableDataSource<Usuarios>(data.data);
          console.log(data.data);
    });
  }

  guardar(form: NgForm) {

    if(form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Al parecer te falta un campo. Intenta nuevamente',
      })
    }
    console.log(this.usuario);
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(resp => {
        console.log("se realizo la actualización del usuario "+this.usuario.nombre);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  actualizar(formulario: NgForm) {
    //this.usuario.id_usuario = 19;
    console.log(this.usuario);
    this.usuarioService.actualizarUsuario(this.usuario)
    
      .subscribe(resp => {
        console.log("se realizo la insersion"+this.usuario.nombre);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: `¿Estas seguro de eliminar el usuario: ${usuario.nombre}?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.usuarioService.eliminarUsuario(usuario.id_usuario);
      }
    })
  }
}

export interface Roles {
  id_rol: number;
  nombre: string;
}

export interface Usuarios {
  id_usuario: number;
  id_rol: number;
  nombre: string;
  activo: string;
}

