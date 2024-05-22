import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await this.supabaseService.getClient().from('profiles').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }

  async getProfile(id: number): Promise<Profile | null> {
    const { data, error } = await this.supabaseService.getClient().from('profiles').select('*').eq('id', id).single();

    if (error) {
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  }
}
