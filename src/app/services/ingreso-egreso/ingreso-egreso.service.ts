import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Auth, authState } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import { map, Subscription } from 'rxjs';

import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { IngresosEgresos } from 'src/app/models/ingresos-egresos.model';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private userSubscription: Subscription;
  private auth: Auth = inject(Auth);

  constructor(private dbFire: AngularFirestore, private store: Store<AppState>, private aut: AuthService) {
    this.userSubscription = Subscription.EMPTY;
  }
  crearIngresoEgreso(ingresoEgreso: IngresosEgresos) {
    delete ingresoEgreso.uid

    return this.dbFire.collection(`${this.aut.user.uid}/ingresos-egresos/items`).add({ ...ingresoEgreso })

  }
  initIngresosEgresosListener(uid: string) {
    /*  this.dbFire.doc().collection('items').valueChanges().subscribe(algo => console.log(algo) )*/
    return this.dbFire.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges().pipe(
        map(snapshop => snapshop.map(doc =>
        ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        )
        )
      )

  }
  borrarItem(uid: string) {
    return this.dbFire.doc(`${this.aut.user.uid}/ingresos-egresos/items/${uid}`).delete()
  }
}
