import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about-socials',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatTooltipModule],
  templateUrl: './about-socials.component.html',
  styleUrl: './about-socials.component.scss',
})
export class AboutSocialsComponent {
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

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/github.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/linkedin.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'stackoverflow',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/stackoverflow.svg'
      )
    );
  }
}

export interface SocialLink {
  name: string;
  url: string;
  svgIcon?: string;
  materialIcon?: string;
}
