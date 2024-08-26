import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslocoDirective } from '@jsverse/transloco';

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
    MatButtonModule,
  ],
  templateUrl: './about-header.component.html',
  styleUrl: './about-header.component.scss',
})
export class AboutHeaderComponent {
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
      name: 'Firebase',
      imageUrl: 'https://cdn.svgporn.com/logos/firebase.svg',
    },
    {
      name: 'Flutter',
      imageUrl: 'https://cdn.svgporn.com/logos/flutter.svg',
    },
    {
      name: 'Docker',
      imageUrl: 'https://cdn.svgporn.com/logos/docker-icon.svg',
    },
  ];
}
