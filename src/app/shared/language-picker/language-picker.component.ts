import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoService } from '@jsverse/transloco';

export type LangType = 'en' | 'es';

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LanguagePickerComponent implements OnInit {
  translate = inject(TranslocoService);

  languages: LangType[] = ['en', 'es'];

  socialPlatforms = [
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/',
    },
    {
      name: 'github',
      link: 'https://github.com/hidragos',
    },
    {
      name: 'stackoverflow',
      link: 'https://stackoverflow.com/users/11674485/dragos-andrei',
    },
  ];

  activeLang: LangType = 'en';
  isHoveringOver?: LangType | null;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  @ViewChild('button') button!: HTMLButtonElement;

  changeLanguage(lang: LangType): void {
    this.activeLang = lang;
    this.setLocalStorageActiveLang(lang);
    this.translate.setActiveLang(lang);
  }

  ngOnInit(): void {
    const activeLang = this.getLocalStorageActiveLang();
    this.activeLang = activeLang || 'en';
    this.setLocalStorageActiveLang(this.activeLang);
    this.translate.setActiveLang(this.activeLang);
  }

  getLocalStorageActiveLang(): LangType | null {
    return this.isLocalStorageAvailable
      ? (localStorage?.getItem('activeLang') as LangType)
      : null;
  }

  setLocalStorageActiveLang(lang: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage?.setItem('activeLang', lang);
    }
  }
}
