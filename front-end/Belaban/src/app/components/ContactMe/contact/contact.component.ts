import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    // التحقق من أن كل الحقول ممتلئة
    if (!this.name || !this.email || !this.message) {
      this.successMessage = '';
      this.errorMessage = 'Please fill all fields.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      fullname: this.name,   // عدلت الاسم ليتطابق مع C# model
      email: this.email,
      message: this.message,
      subject: '',           // ممكن تضيف حقل Subject أو تتركه فارغ
      // SentDate في backend يتم تعيينه تلقائياً، لا ترسله من هنا
    };

    this.http.post('https://localhost:7183/api/ContactMessages', payload).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.name = '';
        this.email = '';
        this.message = '';
      },
      error: (err) => {
        console.error('Error response from API:', err);
        this.errorMessage = 'Failed to send message. Please try again later.';
      }
    });
  }
}
