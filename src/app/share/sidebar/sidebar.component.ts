import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private rout: Router, private auth: AuthService) {

  }

  cerrarSesion() {
    this.auth.closeSesion().then(signOut => {
      this.rout.navigate(['/login']);
    })
  }
}
