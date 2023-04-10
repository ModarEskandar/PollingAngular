import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { DataService } from './data.service';
import { Observable, from, take } from 'rxjs';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import { User } from '../store/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor() {}
  usersList = new BehaviorSubject<User[]>([]);

  setUsers(users: User[]) {
    this.usersList.next(users);
  }
  addUserQuestion(userId: string, questionId: string) {
    this.usersList.pipe(take(1)).subscribe((users: User[]) => {
      users.map((user) => {
        if (user.id === userId) user.questions.push(questionId);
      });
      console.log(users);

      this.usersList.next(users);
    });
  }
  addUserAnswer(userId: string, questionId: string, answerOption: string) {
    this.usersList.pipe(take(1)).subscribe((users: User[]) => {
      users.map((user) => {
        if (user.id === userId)
          user.answers = { ...user.answers, [questionId]: answerOption };
      });
      console.log(users);

      this.usersList.next(users);
    });
  }
}
