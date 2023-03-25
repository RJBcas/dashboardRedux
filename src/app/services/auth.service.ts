import { Injectable, inject } from '@angular/core';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Auth, authState } from '@angular/fire/auth';


import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  /* private firestore: Firestore = inject(Firestore); */
  constructor(private dbFire: AngularFirestore) { }

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
    return signOut(this.auth)
  }
  initAuthListener() {
    return authState(this.auth)
  }
  isAuth() {
    return authState(this.auth).pipe(
      map(fbUser => fbUser != null))
  }
}
