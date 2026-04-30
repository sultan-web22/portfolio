import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../core/interfaces/contact.module';
import { ContactService } from '../../core/services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html'
})
export class ContactDashboardComponent implements OnInit, OnDestroy {
  messages: any[] = []; // Using any[] if your interface doesn't have 'id' or 'read' yet
  private subs = new Subscription();

  constructor(private _contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.subs.add(
      this._contactService.getContacts().subscribe(data => {
        this.messages = data;
      })
    );
  }

  markAsRead(id: string) {
    this._contactService.updateContactStatus(id, true).subscribe(() => {
      // Refresh the list or update the local state
      const msg = this.messages.find(m => m._id === id);
      if (msg) msg.read = true;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}