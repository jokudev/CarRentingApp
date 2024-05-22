import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private supabaseService: SupabaseService) {}

  async getCars(): Promise<Car[]> {
    const { data, error } = await this.supabaseService.getClient().from('cars').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }
}
