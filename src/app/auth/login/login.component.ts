import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs'

import * as uiActions from '../../share/NgRxjs/ui.actions'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;
  constructor(private fb: FormBuilder, private rout: Router, private auth: AuthService, private store: Store<AppState>) {
    this.uiSubscription = Subscription.EMPTY;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }

  login() {
    this.store.dispatch(uiActions.isLoading())
    /*     Swal.fire({
          title: 'Espere por favor',
          didOpen: () => {
            Swal.showLoading()
          },
        }) */
    const { email, password } = this.loginForm.value
    this.auth.loginUser(email, password)
      .then(isLogin => {
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
        this.store.dispatch(uiActions.stopLoadin())

        this.rout.navigate(['/dashboard'])
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoadin())

        console.log(err)
        Swal.hideLoading()
        Swal.fire({
          icon: 'error',
          title: 'A ocurrido un error',
          text: 'Correo o contraseña invalidos'
        })
      })

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }
}
