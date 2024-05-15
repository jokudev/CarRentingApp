import { Component } from '@angular/core';
import { Car } from '../../models/car.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cars: Car[] | null = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      type: 'Sedan',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 0,
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'CRV',
      type: 'SUV',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'F150',
      type: 'Truck',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 4,
      brand: 'Chevy',
      model: 'Malibu',
      type: 'Sedan',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 5,
      brand: 'Jeep',
      model: 'Wrangler',
      type: 'SUV',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 6,
      brand: 'Ram',
      model: '1500',
      type: 'Truck',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 7,
      brand: 'Kia',
      model: 'Optima',
      type: 'Sedan',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 8,
      brand: 'Hyundai',
      model: 'Santa Fe',
      type: 'SUV',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 9,
      brand: 'Mazda',
      model: 'CX-5',
      type: 'Truck',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 10,
      brand: 'Subaru',
      model: 'Legacy',
      type: 'Sedan',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 11,
      brand: 'Nissan',
      model: 'Rogue',
      type: 'SUV',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    },
    {
      id: 12,
      brand: 'Tesla',
      model: 'Cybertruck',
      type: 'Truck',
      pictureUrl: 'https://via.placeholder.com/150',
      status: 1,
    }
  ];

  getCars(): Car[] {
    return this.cars?.filter(car => car.status === 1) ?? [];
  }
}
