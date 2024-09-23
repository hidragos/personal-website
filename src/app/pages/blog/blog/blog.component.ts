import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="page-container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class BlogComponent {}
