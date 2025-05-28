import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu-item';
import { MenuService } from '../../../service/menu-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-for-admin',
  templateUrl: './menu-for-admin.component.html',
  styleUrls: ['./menu-for-admin.component.css'],
  standalone: true,        // مهم لو انت بتستخدم standalone components
  imports: [FormsModule , CommonModule],  // تأكد من اضافة FormsModule هنا

})
export class MenuForAdminComponent implements OnInit {
  menuItems: MenuItem[] = [];
  editItem: MenuItem | null = null;

  updatedName = '';
  updatedDescription = '';
  updatedPrice: number | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuService.getMenuItems().subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error('Failed to load menu items:', err)
    });
  }

  startEdit(item: MenuItem) {
    this.editItem = { ...item };  // نسخة من العنصر
    this.updatedName = item.name;
    this.updatedDescription = item.description;
    this.updatedPrice = item.price;
  }

  cancelEdit() {
    this.editItem = null;
  }

  saveEdit() {
    if (!this.editItem) return;

    const updatedItem: MenuItem = {
      ...this.editItem,
      name: this.updatedName,
      description: this.updatedDescription,
      price: this.updatedPrice || 0
    };

    this.menuService.updateMenuItem(updatedItem).subscribe({
      next: () => {
        alert('تم التحديث بنجاح!');
        this.editItem = null;
        this.loadMenuItems();
      },
      error: (err) => {
        console.error('فشل في التحديث:', err);
        alert('فشل في تحديث العنصر');
      }
    });
  }

  deleteItem(id: number) {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;

    this.menuService.deleteMenuItem(id).subscribe({
      next: () => {
        alert('تم الحذف بنجاح!');
        this.loadMenuItems();
      },
      error: (err) => {
        console.error('فشل في الحذف:', err);
        alert('فشل في حذف العنصر');
      }
    });
  }
}
