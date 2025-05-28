import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ContactMessage {
  id: number;           // تأكد أن الـ backend يعيد id بهذا الاسم (id وليس Id)
  fullname: string;
  email: string;
  Message: string;
  Subject: string;
  SentDate?: string;
}

@Component({
  selector: 'app-admin-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AllMessagesComponent implements OnInit {
  messages: ContactMessage[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.loading = true;
    this.http.get<ContactMessage[]>('https://localhost:7183/api/ContactMessages')
      .subscribe({
        next: data => {
          this.messages = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load messages.';
          this.loading = false;
        }
      });
  }

  deleteMessage(id: number) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    this.http.delete(`https://localhost:7183/api/ContactMessages/${id}`)
      .subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.id !== id);
          alert('Message deleted successfully.');
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete message. ' + (err.error?.message || ''));
        }
      });
  }
}
