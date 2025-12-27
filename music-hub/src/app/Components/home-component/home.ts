import { Component, inject } from '@angular/core';
import { AuthService } from '../../Service/AuthService';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'home',
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomeComponent {
  private auth = inject(AuthService);
  user = this.auth.getUser();


  logout() {
    this.auth.logout();
  }
}
