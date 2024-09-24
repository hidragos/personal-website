import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

export class AreYouSureData {
  text?: string = 'Are you sure you want to delete this item?';
  title?: string = 'Confirm deletion';
  confirmText?: string = 'Delete';
  closeText?: string = 'Cancel';
}

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
  template: `
    <section>
      <form #form="ngForm">
        <span mat-dialog-title>
          {{ dialogData.title }}
        </span>

        <div fxLayout="column" mat-dialog-content>
          {{ dialogData.text }}
        </div>

        <div mat-dialog-actions>
          <div></div>
          <div>
            <button mat-button (click)="closeDialog(false)">
              {{ dialogData.closeText }}
            </button>
            <button
              mat-button
              color="warn"
              type="button"
              (click)="closeDialog(true)"
            >
              {{ dialogData.confirmText }}
            </button>
          </div>
        </div>
      </form>
    </section>
  `,
})
export class AreYouSureDialogComponent {
  @ViewChild('form', { static: true }) form!: NgForm;

  complexDeleteTextToReproduceInput = '';
  dialogData: AreYouSureData;

  constructor(
    private readonly dialogRef: MatDialogRef<AreYouSureData>,
    @Inject(MAT_DIALOG_DATA) private readonly data: AreYouSureData
  ) {
    this.dialogData = new AreYouSureData();
    Object.assign(this.dialogData, data);
    this.dialogRef.backdropClick().subscribe(() => {
      this.closeDialog(false);
    });
  }

  closeDialog(value: boolean) {
    this.dialogRef.close(value);
  }
}
