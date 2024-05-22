import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { NgFor } from '@angular/common';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  cars: Car[] | null = [];

  constructor(private carService: CarService) {}

  async ngOnInit() {
    try {
      this.cars = await this.carService.getCars();
      console.log('Cars:', this.cars);
    } catch (error) {
      console.error('Failed to load cars:', error);
    }
  }
}
