import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../store/models/question.model';
import { UsersService } from '../services/users.service';
import { User } from '../store/models/user.model';

@Component({
  selector: 'leadboard',
  templateUrl: './leadboard.component.html',
})
export class LeadboardComponent implements OnInit {
  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {}

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
  ngOnInit() {
    this.usersService
      .usersList
      .subscribe({
        next: (users:User[]) => {
          this.users = users;
          console.log(users);

          this.isLoading = false;
        },
      });
    // this.leadboard = this.users.map((user) => {
    //   let asked = 0;
    //   let answered = 0;
    //   for (let question of this.questions) {
    //     if (user.name === question.author) asked++;
    //     if (
    //       question.optionOne.votes.includes(user.id) ||
    //       question.optionTwo.votes.includes(user.id)
    //     )
    //       answered++;
    //   }
    //   return { user: user.name, asked: asked, answered: answered };
    // });
    // this.leadboard.sort(
    //   (s1, s2) => (s2.answered + s2.asked)-(s1.answered + s1.asked )
    // );
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
