import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  AccountComponent,
  AuthComponent,
  FooterComponent,
  NavBarComponent,
  QtAliensComponent,
  SidenavContainerComponent,
  SidenavContainerService,
  SupabaseService,
} from '@shared';

import { HeartLoveComponent } from './pages/heart-love/heart-love.component';
import { ResumeComponent } from './pages/resume/resume-component/resume.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    RouterOutlet,
    ResumeComponent,
    NavBarComponent,
    FooterComponent,
    SidenavContainerComponent,
    QtAliensComponent,
    HeartLoveComponent,
    CommonModule,
    AccountComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  sidenavContainerService = inject(SidenavContainerService);
  supabase = inject(SupabaseService);
  router = inject(Router);

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.signOut();
    this.supabase.authChanges(
      (_, session) => ((this.session = session), console.log(this.session))
    );

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && this.container) {
        this.container.nativeElement.scrollTop = 0;
      }
    });
  }
}
