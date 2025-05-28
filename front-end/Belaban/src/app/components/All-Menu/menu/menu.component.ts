import { Component } from '@angular/core';
import { MenuService } from '../../../service/menu-service.service';
import { MenuItem } from '../../../interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../Pages&COM/loader/loader.component";

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: data => this.menuItems = data,
      error: err => console.error('Failed to load menu items:', err)
    });
  }

  getImageSrc(imageUrl: string | undefined): string {
    if (!imageUrl || imageUrl === 'string') {
      return '/assets/images/placeholder.png';
    }
    if (imageUrl.startsWith('http') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/images/')) {
      return `https://localhost:7183${imageUrl}`;
    }
    if (imageUrl.startsWith('images/')) {
      return `https://localhost:7183/${imageUrl}`;
    }
    return '/assets/images/placeholder.png';
  }

  onImgError(event: any) {
    event.target.src = '/assets/images/placeholder.png';
  }
}
