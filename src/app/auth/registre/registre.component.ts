import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private rout: Router) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(6)]]

      }
    )

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  crearUsuario() {
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })
    console.log(this.registroForm.value)
    const { nombre, correo, password } = this.registroForm.value
    this.auth.crearUsuario(nombre, correo, password).then(

      credenciales => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        console.warn(credenciales)
        this.rout.navigate(['/dashboard'])
      }
    ).catch(err => {
      console.log(err)
      Swal.hideLoading()
      Swal.fire({
        icon: 'error',
        title: 'A ocurrido un error',
        text: 'No se pudo crear el usuario intente más tarde.'
      })
    })

  }
}
