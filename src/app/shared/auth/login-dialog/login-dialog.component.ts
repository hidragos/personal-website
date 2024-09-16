import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, takeWhile, timer } from 'rxjs';

import { SupabaseService } from '../../supabase';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  linkSent = false;
  formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  private supabaseService = inject(SupabaseService);

  private supabase = this.supabaseService.supabaseClient;

  seconds = 10;
  timeRemaining$ = new Observable<number>();
  errorMessages: string[] = [];
  linkError = '';

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  initTimer() {
    this.timeRemaining$ = timer(0, 1000).pipe(
      map((n) => (this.seconds - n) * 1000),
      takeWhile((n) => n >= 0)
    );

    const subscription = this.timeRemaining$.subscribe({
      complete: () => {
        this.linkSent = false;
        subscription.unsubscribe();
        this.email.enable();
      },
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessages = [];
    this.loginForm.markAsDirty();
    this.loginForm.markAsTouched();
    const errors = this.loginForm.errors;
    if (errors)
      this.errorMessages = Object.keys(errors).map((key) => errors[key]);

    if (this.loginForm.invalid) return;

    const { error } = await this.supabaseService.signIn(this.email.value);
    if (error) {
      this.errorMessages.push(error.message);
      this.linkError = `Error: ${error.message}`;
      return;
    }

    this.linkSent = true;
    this.email.disable();
    this.initTimer();
  }
}
