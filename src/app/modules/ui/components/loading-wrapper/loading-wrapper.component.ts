import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-loading-wrapper',
  templateUrl: './loading-wrapper.component.html',
  styleUrls: ['./loading-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingWrapperComponent {
  @Input() loading = false;
  @Input() error: Error = null;
  @Output() retry = new EventEmitter();
}
