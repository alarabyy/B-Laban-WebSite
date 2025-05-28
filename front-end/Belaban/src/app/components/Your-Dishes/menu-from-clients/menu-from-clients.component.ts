import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ClientDish {
  id: number;
  dishName: string;
  ingredients: string;
  email: string;
  fullname: string;
  imageUrl: string;
}

@Component({
  selector: 'app-menu-from-clients',
  templateUrl: './menu-from-clients.component.html',
  styleUrls: ['./menu-from-clients.component.css'],
  imports: [CommonModule],
})
export class MenuFromClientsComponent implements OnInit {
  dishes: ClientDish[] = [];
  apiUrl = 'https://localhost:7183/api/CreateYourDishes';
  imageBaseUrl = 'https://localhost:7183'; // مهم لعرض الصور

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.http.get<ClientDish[]>(this.apiUrl).subscribe({
      next: (res) => this.dishes = res,
      error: (err) => console.error('Error fetching dishes:', err)
    });
  }
}
