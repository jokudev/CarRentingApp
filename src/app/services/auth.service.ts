import { Injectable, NgZone } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase = this.supabaseService.getClient();

  private user = new BehaviorSubject<User | null>(null);

  constructor(private supabaseService: SupabaseService, private router: Router, private ngZone: NgZone) {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user.next(session?.user ?? null);
    });
  }

  getUser() {
    return this.user.asObservable();
  }

  async signInWithGithub() {
    await this.supabaseService.signInWithGithub();
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.ngZone.run(() => { this.router.navigate(['/signin']); });
  }

  async isAuthenticated() {
    const res = await this.supabase.auth.getUser();
    return res.data.user !== null;
  }
}
