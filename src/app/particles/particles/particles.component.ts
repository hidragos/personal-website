import { AfterContentChecked, Component } from '@angular/core';
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import configs from '@tsparticles/configs';
import { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [NgxParticlesModule],
  template: `
    @if (displayParticles) {
    <ngx-particles [options]="particlesOptions"></ngx-particles>
    }
  `,
  styles: ``,
})
export class ParticlesComponent implements AfterContentChecked {
  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  // particlesUrl = 'http://foo.bar/particles.json';

  /* or the classic JavaScript object */
  particlesOptions: ISourceOptions = configs.amongUs;

  displayParticles = false;

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: any) => {
      await loadSlim(engine);
    });
  }

  ngAfterContentChecked(): void {
    if (typeof window !== 'undefined') this.displayParticles = true;
  }
}
