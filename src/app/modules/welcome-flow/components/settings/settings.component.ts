import {ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject, timer} from 'rxjs';
import {BaseStepComponent} from '../../../component-flow/components/base-step/base-step.component';
import {WelcomeFlowState, WelcomeFlowStateService} from '../../services/welcome-flow-state.service';
import {catchError, switchMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent extends BaseStepComponent<WelcomeFlowState> implements OnInit, OnDestroy {
  loading = false;
  error = null;
  load$ = new Subject();
  destroy$ = new Subject();

  constructor(
    injector: Injector,
    public welcomeFlowService: WelcomeFlowStateService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.welcomeFlowService.dataChanges$.subscribe(data => {
      this.flowControlService.disableNext(this.getDisableNext());
    });

    this.load$
      .pipe(
        tap(() => {
          this.flowControlService.disableNext(true);
          this.loading = true;
          this.error = null;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(() =>
          this.loadRemoteDataOrFail().pipe(
            catchError(error => {
              this.error = error;
              return of(null);
            }),
          )
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.loading = false;
        this.flowControlService.disableNext(this.getDisableNext());
        this.changeDetectorRef.markForCheck();
      });

    this.load$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDisableNext(): boolean {
    return this.loading || this.error || this.stateService.getData().settings.name.length <= 0;
  }

  onEnablePushes(checked: boolean): void {
    this.stateService.patchData({
      settings: {
        ...this.stateService.getData().settings,
        enablePushes: checked,
      }
    });
  }

  onNameChange(name: string): void {
    this.stateService.patchData({
      settings: {
        ...this.stateService.getData().settings,
        name,
      }
    });
  }

  onRetry(): void {
    this.load$.next();
  }

  private loadRemoteDataOrFail(): Observable<number> {
    return timer(2000 * Math.random() + 500)
      .pipe(
        tap(() => {
          if (Math.random() < 0.5) {
            throw new Error('Some demo error has been thrown!');
          }
        }),
      );
  }
}
