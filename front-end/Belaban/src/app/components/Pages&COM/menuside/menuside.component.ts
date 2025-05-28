import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menuside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule , CommonModule],
  templateUrl: './menuside.component.html',
  styleUrl: './menuside.component.css'
})
export class MenusideComponent {
  isSidebarHidden = true;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  logout() {
    localStorage.removeItem('authorized'); // حذف حالة تسجيل الدخول
    this.router.navigate(['/Home']); // إعادة التوجيه للصفحة الرئيسية
  }

    get isLoggedIn(): boolean {
    return localStorage.getItem('authorized') === 'true';
  }


}
