import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-your-dish',
  templateUrl: './create-your-dish.component.html',
  styleUrls: ['./create-your-dish.component.css'],
    imports: [CommonModule , ReactiveFormsModule]

})
export class CreateYourDishComponent {
  dishForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.dishForm = this.fb.group({
      dishName: ['', [Validators.required, Validators.maxLength(100)]],
      ingredients: ['', [Validators.required, Validators.maxLength(1000)]],
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.dishForm.invalid) return;

    const formData = new FormData();
    formData.append('dishName', this.dishForm.get('dishName')?.value);
    formData.append('ingredients', this.dishForm.get('ingredients')?.value);
    formData.append('email', this.dishForm.get('email')?.value);
    formData.append('fullname', this.dishForm.get('fullname')?.value);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.http.post('https://localhost:7183/api/CreateYourDishes', formData).subscribe({
      next: () => {
        alert('Dish submitted successfully!');
                    window.location.href = '/MenuFromClients';

        this.dishForm.reset();
        this.imagePreview = null;
      },
      error: err => {
        alert('Error submitting dish!');
        console.error(err);
      }
    });
  }
}
