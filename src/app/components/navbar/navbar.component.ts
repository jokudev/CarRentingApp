import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgbModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public profile: { avatar_url: string; full_name: string } | null = null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      if (user?.user_metadata['avatar_url'] && user?.user_metadata['full_name']) {
        this.profile = {
          avatar_url: user?.user_metadata['avatar_url'],
          full_name: user?.user_metadata['full_name'],
        };
      } else {
        this.profile = null;
      }
    });
  }

  async signOut() {
    await this.authService.signOut();
    this.profile = null;
  }
}
