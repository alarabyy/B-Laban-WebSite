import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  menuOpen = false;
    public constructor(private router: Router) {

    }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('authorized') === 'true';
  }

  logout() {
    localStorage.removeItem('authorized'); // حذف حالة تسجيل الدخول
    this.router.navigate(['/Home']); // إعادة التوجيه للصفحة الرئيسية
  }
}
