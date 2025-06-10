
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})

export class SideMenuComponent {
  @Output() closeMenu = new EventEmitter<void>();

  auth = inject(AuthService);

  logout() {
    this.auth.logout();
    this.closeMenu.emit();
  }
}

