import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs'
import * as uiActions from '../../share/NgRxjs/ui.actions'


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription$: Subscription

  constructor(private fb: FormBuilder, private auth: AuthService, private rout: Router, private store: Store<AppState>) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(6)]]

      }
    )

    this.uiSubscription$ = Subscription.EMPTY;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.uiSubscription$ = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }
  crearUsuario() {

    this.store.dispatch(uiActions.isLoading())
    /*     Swal.fire({
          title: 'Espere por favor',
          didOpen: () => {
            Swal.showLoading()
          },
        }) */
    /* console.log(this.registroForm.value) */
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
        this.store.dispatch(uiActions.stopLoadin())

        this.rout.navigate(['/dashboard'])
      }
    ).catch(err => {
      console.log(err)
      this.store.dispatch(uiActions.stopLoadin())

      Swal.hideLoading()
      Swal.fire({
        icon: 'error',
        title: 'A ocurrido un error',
        text: 'No se pudo crear el usuario intente más tarde.'
      })
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSubscription$.unsubscribe()
  }

}
