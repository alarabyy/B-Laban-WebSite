import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../../service/menu-service.service';

@Component({
  selector: 'app-add-to-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-to-menu.component.html',
  styleUrls: ['./add-to-menu.component.css']
})
export class AddToMenuComponent {
  menuForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private menuService: MenuService) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      image: [null, Validators.required]
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    this.menuForm.patchValue({ image: this.selectedImage });
    this.menuForm.get('image')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.menuForm.valid || !this.selectedImage) return;

    const formData = new FormData();
    formData.append('name', this.menuForm.value.name);
    formData.append('description', this.menuForm.value.description);
    formData.append('price', this.menuForm.value.price.toString());
    formData.append('image', this.selectedImage);

    this.menuService.addMenuItem(formData).subscribe({
      next: () => {
        alert('تمت الإضافة بنجاح!');
        this.menuForm.reset();
        this.selectedImage = null;
      },
      error: err => {
        console.error('فشل الإرسال:', err);
        alert('حدث خطأ أثناء الإضافة');
      }
    });
  }
}
