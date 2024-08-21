import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslocoDirective } from '@jsverse/transloco';

export class Skill {
  constructor(public name: string, public imageUrl: string) {}
}
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  showSoftSkills = false;
  softSkills = [
    'linux',
    'typescript',
    'firebase',
    'node',
    'javascript',
    'flutter',
    'dart',
    'git',
    'github',
    'python',
    'cloud-functions',
    'vs-code',
    'angular-material',
    'ef core',
    'webapi',
    'signalr',
    'css',
    'tailwind',
    'database',
    'authentication',
    'nx',
    'security',
    'sql',
    'docker',
    'auth',
    'regex',
    'forms',
    'rxjs',
    'devops',
    'cloud-storage',
    'realtimedb',
  ];

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
