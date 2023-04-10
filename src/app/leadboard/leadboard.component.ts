import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../store/models/question.model';
import { UsersService } from '../services/users.service';
import { User } from '../store/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'leadboard',
  templateUrl: './leadboard.component.html',
})
export class LeadboardComponent implements OnInit,OnDestroy {
  constructor(
    private usersService: UsersService
  ) {}
  ngOnDestroy(): void {
    this.usersSub.unsubscribe();  }

  isLoading = true;
  questions: Question[] = [];
  users: User[] = [];
  leadboard!: { user: string; asked: number; answered: number }[];
  scores!: {
    username: string;
    avatarUrl: string;
    asked: number;
    answered: number;
  }[];
  usersSub!:Subscription;
  ngOnInit() {
   this.usersSub =  this.usersService
      .usersList
      .subscribe({
        next: (users:User[]) => {
          this.users = users;
          console.log(users);

          this.isLoading = false;
        },
      });

    this.scores = this.users
      .map((user) => {
        return {
          username: user.name,
          avatarUrl: user.avatarURL,
          asked: user.questions.length,
          answered: Object.keys(user.answers).length,
        };
      })
      .sort((s1, s2) => s2.answered + s2.asked - (s1.answered + s1.asked));
  }
}
