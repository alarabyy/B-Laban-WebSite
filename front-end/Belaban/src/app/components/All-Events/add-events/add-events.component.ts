import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Event {
  id?: number;
  title: string;
  description: string;
  eventDate: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-event',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddEventsComponent {
  event: Event = {
    title: '',
    description: '',
    eventDate: '',
  };
  selectedFile: File | null = null;
  submitError = '';
  submitSuccess = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.submitError = '';
    } else {
      this.selectedFile = null;
    }
  }

  submitEvent() {
    this.submitError = '';
    this.submitSuccess = '';

    const formData = new FormData();
    formData.append('title', this.event.title);
    formData.append('description', this.event.description);
    formData.append('eventDate', this.event.eventDate);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post<Event>('https://localhost:7183/api/Events', formData)
      .subscribe({
        next: () => {
          this.submitSuccess = 'تم إضافة الحدث بنجاح!';
          this.event = { title: '', description: '', eventDate: '' };
          this.selectedFile = null;
        },
        error: (error) => {
          this.submitError = 'فشل إضافة الحدث.';
          console.error('Error details:', error);
        }
      });
  }
}
