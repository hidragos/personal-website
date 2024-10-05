import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { FooterComponent } from 'src/app/shared/footer';

interface SocialLink {
  materialIcon?: string;
  name: string;
  svgIcon?: string;
  url: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatCardModule,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],

  template: `
    <ng-container *transloco="let t">
      <div class="flex justify-center items-center">
        <img
          matRipple
          class="rounded-full w-[250px] mat-elevation-z4"
          src="assets/images/profile.jpeg"
        />
      </div>
      <div appearance="outlined" class="mt-4">
        <div
          class="flex flex-col items-center justify-center w-full mb-8 mt-4 gap-4"
        >
          <!-- Greeting -->
          <h2 class="text-center mb-2 py-4">{{ t('about.greeting') }} 👋</h2>

          <!-- Socials -->
          <div class="flex flex-row gap-6 justify-center">
            @for (social of socials; track social.name) {
            <a
              mat-icon-button
              matTooltip="{{ social.name }}"
              color="primary"
              href="{{ social.url }}"
              target="_blank"
            >
              @if (social.svgIcon) {
              <mat-icon [svgIcon]="social.svgIcon!"></mat-icon>
              } @if (social.materialIcon) {
              <mat-icon>
                {{ social.materialIcon }}
              </mat-icon>
              } </a
            >}
          </div>
        </div>
        <div>
          @for(line of t('about.sections.intro.lines', { returnObjects: true });
          track line; let last = $last){
          <p>{{ line }}</p>
          }
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      mat-card-header {
        border: none;
      }
    `,
  ],
})
export class AboutComponent {
  socials: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/hidragos',
      svgIcon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/',
      svgIcon: 'linkedin',
    },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/11674485/dragos-andrei',
      svgIcon: 'stackoverflow',
    },
    {
      name: 'Mail',
      url: 'mailto:hi.dragos.andrei@gmail.com"',
      materialIcon: 'email',
    },
  ];
}
