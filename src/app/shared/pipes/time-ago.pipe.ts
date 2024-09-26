import {
  ChangeDetectorRef,
  inject,
  NgZone,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'timeAgo',
  pure: false,
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: any;
  private translocoService = inject(TranslocoService);
  private langChangeSub: Subscription;

  // Define constants for time calculations
  private readonly secondsInMinute = 60;
  private readonly secondsInHour = 3600; // 60 * 60
  private readonly secondsInDay = 86400; // 24 * 3600
  private readonly secondsInWeek = 604800; // 7 * 86400
  private readonly secondsInMonth = 2592000; // 30 * 86400 (approximate)
  private readonly secondsInYear = 31536000; // 365 * 86400

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.langChangeSub = this.translocoService.langChanges$.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  transform(value: Date | string | number): string {
    if (!value) return '';

    const time = new Date(value).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - time) / 1000);

    let interval: number;

    if (seconds >= this.secondsInYear) {
      interval = Math.floor(seconds / this.secondsInYear);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.years', { count: interval })
        : this.translocoService.translate('timeAgo.year', { count: interval });
    }

    if (seconds >= this.secondsInMonth) {
      interval = Math.floor(seconds / this.secondsInMonth);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.months', { count: interval })
        : this.translocoService.translate('timeAgo.month', { count: interval });
    }

    if (seconds >= this.secondsInWeek) {
      // Added week handling
      interval = Math.floor(seconds / this.secondsInWeek);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.weeks', { count: interval })
        : this.translocoService.translate('timeAgo.week', { count: interval });
    }

    if (seconds >= this.secondsInDay) {
      interval = Math.floor(seconds / this.secondsInDay);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.days', { count: interval })
        : this.translocoService.translate('timeAgo.day', { count: interval });
    }

    if (seconds >= this.secondsInHour) {
      interval = Math.floor(seconds / this.secondsInHour);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.hours', { count: interval })
        : this.translocoService.translate('timeAgo.hour', { count: interval });
    }

    if (seconds >= this.secondsInMinute) {
      interval = Math.floor(seconds / this.secondsInMinute);
      this.scheduleUpdate(seconds);
      return interval > 1
        ? this.translocoService.translate('timeAgo.minutes', {
            count: interval,
          })
        : this.translocoService.translate('timeAgo.minute', {
            count: interval,
          });
    }

    return this.translocoService.translate('timeAgo.justNow');
  }

  private scheduleUpdate(seconds: number) {
    const nextUpdate = this.getSecondsUntilNextUpdate(seconds);
    this.ngZone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
      }, nextUpdate * 1000);
    });
  }

  private getSecondsUntilNextUpdate(seconds: number): number {
    if (seconds < this.secondsInMinute) {
      return 1;
    } else if (seconds < this.secondsInHour) {
      return this.secondsInMinute - (seconds % this.secondsInMinute);
    } else if (seconds < this.secondsInDay) {
      return this.secondsInHour - (seconds % this.secondsInHour);
    } else if (seconds < this.secondsInWeek) {
      // Adjust for weeks
      return this.secondsInDay - (seconds % this.secondsInDay);
    } else if (seconds < this.secondsInMonth) {
      return this.secondsInWeek - (seconds % this.secondsInWeek);
    } else if (seconds < this.secondsInYear) {
      return this.secondsInMonth - (seconds % this.secondsInMonth);
    } else {
      return this.secondsInYear - (seconds % this.secondsInYear);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
