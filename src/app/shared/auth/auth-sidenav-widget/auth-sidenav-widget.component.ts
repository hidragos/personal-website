import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AreYouSureData } from '../../are-you-sure-dialog/are-you-sure-data';
import { AreYouSureDialogComponent } from '../../are-you-sure-dialog/are-you-sure-dialog.component';
import { SupabaseAuthService } from '../../supabase';

@Component({
  selector: 'app-auth-sidenav-widget',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './auth-sidenav-widget.component.html',
  styleUrl: './auth-sidenav-widget.component.scss',
})
export class AuthSidenavWidgetComponent {
  supabaseAuthService = inject(SupabaseAuthService);
  dialog = inject(MatDialog);
  user: { email: string; avatarUrl: string; fullName: string } | null = null;
  brokenImage = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    effect(() => {
      if (!this.supabaseAuthService.user()) {
        this.user = null;
        return;
      }

      this.user = {
        email: this.supabaseAuthService.user()?.email || '',
        avatarUrl:
          this.supabaseAuthService.user()?.user_metadata['avatar_url'] || '',
        fullName:
          this.supabaseAuthService.user()?.user_metadata['full_name'] || '',
      };
    });

    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/google.svg'
      )
    );
  }

  async signInWithGoogle() {
    await this.supabaseAuthService.signInWithGoogle();
  }

  async signOut() {
    const isSure = await this.dialog
      .open(AreYouSureDialogComponent, {
        data: <AreYouSureData>{
          title: 'Sign out',
          text: 'Are you sure you want to sign out?',
          confirmText: 'bye off',
        },
      })
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    await this.supabaseAuthService.signOut();
    window.location.reload();
  }
}
