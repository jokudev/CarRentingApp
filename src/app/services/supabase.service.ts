import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signInWithGithub() {
    if (environment.supabaseCallbackUrl.length !== 0) {
      await this.supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: environment.supabaseCallbackUrl
        }
      });

      return;
    }
    else {
      await this.supabase.auth.signInWithOAuth({
        provider: 'github'
      });

      return;
    }
  }
}
