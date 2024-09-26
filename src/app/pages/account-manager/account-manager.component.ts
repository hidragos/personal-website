import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoPipe } from '@jsverse/transloco';
import { SupabaseAuthService } from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-account',
  template: `
    <mat-card appearance="outlined">
      <mat-card-header class="text-center">
        <mat-card-title>{{
          'account.manage.title' | transloco
        }}</mat-card-title>
        <mat-card-subtitle>{{
          'account.manage.subtitle' | transloco
        }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form
          [formGroup]="accountForm"
          (ngSubmit)="onSubmit()"
          class="flex flex-col gap-4"
        >
          <!-- Profile Picture -->
          <div class="flex flex-col items-center">
            <img
              [src]="user.profileImage || user.avatarUrl"
              alt="Profile Picture"
              class="rounded-full w-32 h-32 mat-elevation-z2 mb-2 "
            />
            <button
              mat-button
              type="button"
              (click)="triggerFileInput()"
              matTooltip="{{ 'account.manage.changePicture' | transloco }}"
            >
              <mat-icon>edit</mat-icon>
              {{ 'account.manage.changePicture' | transloco }}
            </button>
            <input
              type="file"
              #fileInput
              (change)="onFileSelected($event)"
              accept="image/*"
              class="hidden"
            />
          </div>

          <!-- Username -->
          <span class="text-xs">{{ 'account.manage.name' | transloco }}</span>
          <mat-form-field appearance="outline" class="w-full">
            <input matInput formControlName="username" />
            <mat-error
              *ngIf="accountForm.get('username')?.hasError('required')"
            >
              {{ 'account.manage.errors.usernameRequired' | transloco }}
            </mat-error>
            <mat-error
              *ngIf="accountForm.get('username')?.hasError('minlength')"
            >
              {{ 'account.manage.errors.usernameMinlength' | transloco }}
            </mat-error>
          </mat-form-field>

          <!-- Email (Disabled Field) -->
          <span class="text-xs">{{ 'account.manage.email' | transloco }}</span>
          <mat-form-field appearance="outline" class="w-full">
            <input matInput [value]="user.email" disabled />
          </mat-form-field>

          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              type="submit"
              [disabled]="accountForm.pristine || isSubmitting"
            >
              <mat-icon>save</mat-icon>
              {{ 'account.manage.save' | transloco }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [``],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    TranslocoPipe,
  ],
})
export class AccountManagerComponent implements OnInit, OnDestroy {
  accountForm!: FormGroup;
  isSubmitting: boolean = false;
  private subscriptions: Subscription = new Subscription();

  @ViewChild('fileInput') fileInput!: any;
  user!: {
    email: string;
    avatarUrl: string;
    fullName: string;
    profileImage: string | ArrayBuffer | null;
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private supabaseAuthService: SupabaseAuthService // Inject Supabase service
  ) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Load user data
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUserData(): void {
    // Load user data from Supabase
    this.user = {
      email: this.supabaseAuthService.user()?.email || '',
      avatarUrl:
        this.supabaseAuthService.user()?.user_metadata['avatar_url'] || '',
      fullName:
        this.supabaseAuthService.user()?.user_metadata['full_name'] || '',
      profileImage: null, // Initialize profileImage
    };

    this.accountForm.patchValue({
      username: this.user.fullName, // Assuming you want to set the full name as the username
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profileImage = reader.result; // Store Base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formValue = this.accountForm.value;

    // Prepare the payload
    const payload: any = {
      username: formValue.username,
      profileImage: this.user.profileImage, // Base64 image
    };

    // Mock submission for demonstration
    setTimeout(() => {
      this.snackBar.open('Account updated successfully!', 'Close', {
        duration: 3000,
      });
      this.accountForm.markAsPristine();
      this.isSubmitting = false;
    }, 2000);
  }
}
