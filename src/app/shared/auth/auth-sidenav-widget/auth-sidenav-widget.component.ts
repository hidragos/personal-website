import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-sidenav-widget',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './auth-sidenav-widget.component.html',
  styleUrl: './auth-sidenav-widget.component.scss',
})
export class AuthSidenavWidgetComponent {}
