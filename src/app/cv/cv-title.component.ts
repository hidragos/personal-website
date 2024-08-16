import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-title',
  standalone: true,
  imports: [],
  template: `
    <div class="border border-gray-500">
      <h1 class="text-2xl font-bold text-center">Dragos-Andrei Iliescu</h1>
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
export class CvTitleComponent {}
