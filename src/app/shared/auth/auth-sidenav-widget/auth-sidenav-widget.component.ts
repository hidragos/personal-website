import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-auth-sidenav-widget',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './auth-sidenav-widget.component.html',
  styleUrl: './auth-sidenav-widget.component.scss',
})
export class AuthSidenavWidgetComponent {
  matDialog = inject(MatDialog);

  openLoginDialog() {
    this.matDialog.open(LoginDialogComponent);
  }
}
