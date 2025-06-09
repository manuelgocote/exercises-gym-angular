
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  auth = inject(AuthService);

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

}
