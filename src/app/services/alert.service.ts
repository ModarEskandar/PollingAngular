import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() {}
  alertMsgSubject = new Subject<{ message: string; type: string }>();
  raiseMsgSubjectEmiiterEvent(alertMsgObj: { message: string; type: string }) {
    this.alertMsgSubject.next(alertMsgObj);
  }
}
