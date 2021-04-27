import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  canClose(): Observable<boolean> | boolean {
    return true;
  }
}
