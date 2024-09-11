import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoDirective } from '@jsverse/transloco';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';

interface Skill {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-about-header',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    TranslocoDirective,
    MatDividerModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './about-header.component.html',
  styleUrl: './about-header.component.scss',
})
export class AboutHeaderComponent {
  dialog = inject(MatDialog);

  skills: Skill[] = [
    {
      name: 'Angular',
      imageUrl: 'https://cdn.svgporn.com/logos/angular-icon.svg',
    },
    {
      name: '.NET Core',
      imageUrl: 'https://cdn.svgporn.com/logos/dotnet.svg',
    },
    {
      name: 'Azure DevOps',
      imageUrl: 'https://cdn.svgporn.com/logos/microsoft-azure.svg',
    },
    {
      name: 'Flutter',
      imageUrl: 'https://cdn.svgporn.com/logos/flutter.svg',
    },
    {
      name: 'Docker',
      imageUrl: 'https://cdn.svgporn.com/logos/docker-icon.svg',
    },
    {
      name: 'Firebase',
      imageUrl: 'https://cdn.svgporn.com/logos/firebase.svg',
    },
  ];

  profilePictureClicked() {
    this.dialog.open(ImageDialogComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'fit-content',
      height: '60%',
    });
  }
}
