import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Entreno A', date: '2025-06-03', color: '#4ade80' },
      { title: 'Entreno B', date: '2025-06-05', color: '#facc15' }
    ]
  };

  constructor(private router: Router) {}

  onDateClick(arg: any) {
    this.router.navigate(['/entreno', arg.dateStr]);
  }
}
