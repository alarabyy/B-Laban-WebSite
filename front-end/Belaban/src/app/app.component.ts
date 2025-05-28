import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/Pages&COM/nav/nav.component";
import { FooterComponent } from "./components/Pages&COM/footer/footer.component";
import { MenusideComponent } from "./components/Pages&COM/menuside/menuside.component";
import { LoaderComponent } from "./components/Pages&COM/loader/loader.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, NavComponent, FooterComponent, MenusideComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Resturante';


    showScrollTop = false;

  // استماع لحركة السكروول
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollTop = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
