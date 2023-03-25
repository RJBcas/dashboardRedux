import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresoApp';

  constructor(private auth: AuthService) {
    this.auth.initAuthListener().subscribe(initAuth => {
      console.log(initAuth?.uid)
      console.log(initAuth?.email)

    })

  }

}
