import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../Pages&COM/loader/loader.component";

// تعريف واجهة الحدث
export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  imageUrl?: string;
}

// خدمة الحدث داخل نفس الملف
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7183/api/Events'; // رابط API الخاص بك

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}

// الكمبوننت
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports: [CommonModule],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
// في الماب
this.events = data.map(event => ({
  ...event,
  imageUrl: event.imageUrl
    ? (event.imageUrl.startsWith('http') ? event.imageUrl : `https://localhost:7183${event.imageUrl}`)
    : undefined
}));
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading events.';
        this.loading = false;
      }
    });
  }
}
