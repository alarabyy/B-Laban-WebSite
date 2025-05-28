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

// الخدمة داخل نفس الملف (يمكن تفصيلها في ملف منفصل لو حبيت)
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7183/api/Events'; // عدل حسب API عندك

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// الكمبوننت الإداري
@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
  imports: [CommonModule],
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error: string | null = null;
  deletingId: number | null = null;

  private baseUrl = 'https://localhost:7183'; // أساس رابط API للدومين

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data.map(event => ({
          ...event,
          imageUrl: event.imageUrl
            ? (event.imageUrl.startsWith('http')
              ? event.imageUrl
              : `${this.baseUrl}${event.imageUrl}`)
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

  deleteEvent(id: number): void {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
    this.deletingId = id;
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.id !== id);
        this.deletingId = null;
      },
      error: () => {
        alert('Failed to delete the event.');
        this.deletingId = null;
      }
    });
  }
}
