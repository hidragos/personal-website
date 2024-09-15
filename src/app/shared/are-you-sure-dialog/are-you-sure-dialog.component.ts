import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AreYouSureData } from './are-you-sure-data';

@Component({
  selector: 'app-are-you-sure-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrl: './are-you-sure-dialog.component.scss',
})
export class AreYouSureDialogComponent {
  @ViewChild('form', { static: true }) form!: NgForm;

  complexDeleteTextToReproduceInput = '';
  dialogData: AreYouSureData;

  constructor(
    private readonly dialogRef: MatDialogRef<AreYouSureData>,
    @Inject(MAT_DIALOG_DATA) private readonly data: AreYouSureData
  ) {
    this.dialogData = this.data || new AreYouSureData();
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
