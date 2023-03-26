import { Injectable, inject } from '@angular/core';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Auth, authState } from '@angular/fire/auth';


import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../NgrxGlobal/app.reducer';
import * as userActions from '../auth/ngrxj/auth.action'
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;
  private auth: Auth = inject(Auth);
  /* private firestore: Firestore = inject(Firestore); */
  constructor(private dbFire: AngularFirestore, private store: Store<AppState>) {
    this.userSubscription = Subscription.EMPTY;
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, user?.email ? user.email : email, nombre);

        return this.dbFire.doc(`${user.uid}/usuario`).set({ ...newUser })
      })
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  closeSesion() {
    return signOut(this.auth).then()
  }
  initAuthListener() {
    return authState(this.auth).subscribe(fUser => {
      if (fUser) {
        this.userSubscription = this.dbFire.doc(`${fUser.uid}/usuario`).valueChanges().subscribe(
          (fireStoreUser: any) => {
            const user = Usuario.fromFirebase(fireStoreUser)
            this.store.dispatch(userActions.setUser({ user }))
          }
        )
      } else {
        this.userSubscription.unsubscribe()
        this.store.dispatch(userActions.unSetUser())


      }
    })
  }
  isAuth() {
    return authState(this.auth).pipe(
      map(fbUser => fbUser != null))
  }
}
