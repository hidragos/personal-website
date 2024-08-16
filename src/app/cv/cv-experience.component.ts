import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cv-experience',
  standalone: true,
  imports: [TranslocoPipe, CommonModule],
  template: `
    <div>
      <h1 class="text-xl font-bold">
        {{ 'experience' | transloco | titlecase }}
      </h1>
      <div class="border border-gray-200"></div>
      <span>
        <div class="flex flex-row gap-1 justify-center">
          <span> Valencia, VLC, ES </span>
          <span>&#124;</span>
          <a
            href="mailto: dragos.andrei.iliescu@gmail.com"
            target="_blank"
            class="text-black underline"
          >
            dragos.andrei.iliescu&#64;gmail.com
          </a>
          <span>&#124;</span>
          <a
            href="tel: 633 646 782"
            target="_blank"
            class="text-black underline"
          >
            +34 633 646 782
          </a>
        </div>
      </span>
    </div>
  `,
})
export class CvExperienceComponent {}
