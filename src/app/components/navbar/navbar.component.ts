import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgbModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public profile: { id: string; avatar_url: string; full_name: string } | null = null;

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router, private ngZone: NgZone) {
    this.authService.getUser().subscribe(user => {
      if (user?.user_metadata['avatar_url'] && user?.user_metadata['full_name']) {
        this.profile = {
          id: user.id,
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

  clickAdminDashboard(){
    this.ngZone.run(() => {
      this.router.navigate(['/admin-dashboard']);
    });
  }

  async userIsAdmin(){
    const user = await this.profileService.getProfile(Number(this.profile?.id));
    return user?.is_admin;
  }
}
