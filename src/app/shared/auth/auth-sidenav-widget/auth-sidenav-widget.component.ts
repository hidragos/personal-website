import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import {
  AreYouSureData,
  AreYouSureDialogComponent,
} from '../../are-you-sure-dialog/are-you-sure-dialog.component';
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
    TranslocoDirective,
  ],
  template: `
    <ng-container *transloco="let t">
      <button color="primary" mat-icon-button [matMenuTriggerFor]="picker">
        <mat-icon *ngIf="!user">account_circle</mat-icon>
        <img class="rounded-full" *ngIf="user" [src]="user.avatarUrl" />
      </button>
      <mat-menu
        #picker="matMenu"
        xPosition="before"
        [backdropClass]="'custom-menu'"
      >
        @if(user) {
        <mat-card
          appearance="outlined"
          class="color-on-primary-container auth-sidenav-widget-card"
        >
          <mat-card-header class="w-[300px]">
            <mat-card-title>
              <div class="flex flex-col overflow-hidden mx-8 my-1">
                <div class="flex justify-center flex-col gap-1 text-center">
                  <span class="text-sm"> {{ t('authWidget.greeting') }} </span>
                  <span class="text-lg">{{ user.fullName }}</span>
                  <span class="text-xs">{{ user.email }}</span>
                </div>
                <div class="flex flex-col items-center gap-1 text-ellipsis">
                  <img
                    class="rounded-full w-24 mat-elevation-z2 my-2"
                    [src]="user.avatarUrl"
                  />
                </div>
              </div>
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="flex flex-col items-center justify-center w-full">
              <a
                [routerLink]="'/blog/new'"
                mat-button
                [disabled]="!supabaseAuthService.user()"
              >
                <mat-icon *ngIf="supabaseAuthService.user()">add</mat-icon>
                <span *ngIf="supabaseAuthService.user()">{{
                  t('authWidget.writePost')
                }}</span>
                <span *ngIf="!supabaseAuthService.user()">{{
                  t('authWidget.signInToWrite')
                }}</span>
              </a>
              <a
                *ngIf="supabaseAuthService.user()"
                [routerLink]="'/manage-profile'"
                mat-button
                [disabled]="!supabaseAuthService.user()"
              >
                <mat-icon *ngIf="supabaseAuthService.user()"
                  >manage_accounts</mat-icon
                >
                <span>{{ t('authWidget.manageProfile') }}</span>
              </a>
              <a class="mt-6" color="warn" mat-button (click)="signOut()">
                <mat-icon>logout</mat-icon>
                {{ t('authWidget.signOut') }}
              </a>
            </div>
          </mat-card-content>
        </mat-card>
        }
        <a (click)="signInWithGoogle()" mat-menu-item *ngIf="!user?.fullName">
          <mat-icon svgIcon="google"></mat-icon>
          <span>{{ t('authWidget.signInWithGoogle') }}</span>
        </a>
      </mat-menu>
    </ng-container>
  `,
  styles: [
    `
      .custom-menu {
        background: red !important;
      }
      ::ng-deep .mat-mdc-menu-panel {
        max-width: 100% !important;
        border-radius: 16px !important;
        .mat-mdc-menu-content {
          background: transparent !important;
          padding: 0 !important;
        }
      }

      mat-card {
        padding: 0 !important;
        background: transparent;
      }

      mat-card-header {
        padding: 16px 0 16px 0 !important;
        border: 0;
      }
    `,
  ],
})
export class AuthSidenavWidgetComponent {
  supabaseAuthService = inject(SupabaseAuthService);
  dialog = inject(MatDialog);
  user: { email: string; avatarUrl: string; fullName: string } | null = null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    effect(() => {
      if (!this.supabaseAuthService.user()?.email && !this.user) {
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
          confirmText: 'BYE OFF',
        },
      })
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    await this.supabaseAuthService.signOut();
    window.location.reload();
  }
}
