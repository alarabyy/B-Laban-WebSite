import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

interface Dish {
  id: number;
  dishName: string;
  ingredients: string;
  email: string;
  fullname: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-admin-all-dishs-for-client',
  templateUrl: './admin-all-dishs-for-client.component.html',
  styleUrls: ['./admin-all-dishs-for-client.component.css'],
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
})
export class AdminAllDishsForClientComponent implements OnInit {
  dishes: Dish[] = [];
  loading = false;
  error = '';
  editingId: number | null = null; // ID of the dish currently being edited
  editForm: Partial<Dish> = {};    // Temp data for editing

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.loading = true;
    this.error = '';
    this.http.get<Dish[]>('https://localhost:7183/api/CreateYourDishes')
      .subscribe({
        next: (data) => {
          this.dishes = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load dishes. Please try again later.';
          this.loading = false;
        }
      });
  }

  deleteDish(id: number): void {
    if (!confirm('Are you sure you want to delete this dish?')) return;
    this.http.delete(`https://localhost:7183/api/CreateYourDishes/${id}`)
      .subscribe({
        next: () => {
          this.dishes = this.dishes.filter(d => d.id !== id);
          if (this.editingId === id) this.cancelEdit();
        },
        error: () => {
          alert('Failed to delete the dish. Please try again.');
        }
      });
  }

  startEdit(dish: Dish): void {
    this.editingId = dish.id;
    this.editForm = { ...dish }; // clone for editing
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm = {};
  }

  saveEdit(id: number): void {
    if (
      !this.editForm.dishName ||
      !this.editForm.ingredients ||
      !this.editForm.email ||
      !this.editForm.fullname
    ) {
      alert('Please fill all required fields.');
      return;
    }

    this.http.put(`https://localhost:7183/api/CreateYourDishes/${id}`, this.editForm)
      .subscribe({
        next: () => {
          const index = this.dishes.findIndex(d => d.id === id);
          if (index !== -1) this.dishes[index] = { ...this.editForm, id } as Dish;
          this.cancelEdit();
        },
        error: () => {
          alert('Failed to save changes. Please try again.');
        }
      });
  }
}
