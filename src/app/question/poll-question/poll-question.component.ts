import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable, map, take } from 'rxjs';
import { Question, IQuestion } from '../../store/models/question.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/store/models/user.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'poll-question',
  templateUrl: './poll-question.component.html',
})
export class PollQuestionComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  isPolled = false;
  isAnswered = false;
  isLoading = true;
  selectedChoise = '';
  selectedChoiseIndex = 0;
  options: string[] = [];
  option = '';
  questionId = '';
  questions!: Question[];
  question!: Question;
  authedUser = '';
  totalVotes = 0;
  optionOneVotes = 0;
  optionTwoVotes = 0;
  optionOneRate = 0;
  optionOneRateaa = '60';
  optionTwoRate = 0;
  username = '';
  authorInfo!: User | undefined;
  usernameDictionary!: string[][];
  questions$!: Observable<Question[]>;
  mappedAuthor: string[] = [];
  usersSub!: Subscription;
  questionsSub!: Subscription;
  ngOnInit() {
    this.usersSub = this.usersService.usersList.subscribe((users: User[]) => {
      this.questionsSub = this.questionsService.questionsList.subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          this.questionId = this.route.snapshot.params['id'];
          this.question = this.questions.find(
            (q) => q.id === this.questionId
          ) as Question;
          this.authorInfo = users.find(
            (user) => user.id === this.question.author
          );
          console.log('author information', this.authorInfo);
          this.options.push(this.question.optionOne.text);
          this.options.push(this.question.optionTwo.text);
          const userInfo = localStorage.getItem('userInfo') as string;
          const user: User = JSON.parse(userInfo);
          this.authedUser = user.id;
          if (this.question.optionOne.votes.includes(this.authedUser)) {
            this.selectedChoise = this.options[0];
            this.isAnswered = true;
          }
          if (this.question.optionTwo.votes.includes(this.authedUser)) {
            this.selectedChoise = this.options[1];
            this.isAnswered = true;
          }
          this.isLoading = false;
        }
      );
    });
  }

  onPoll(pollForm: NgForm) {
    this.selectedChoise = pollForm.form.get('option')?.value;

    this.selectedChoiseIndex = this.options.indexOf(this.selectedChoise);
    if (!this.isAnswered) {
      this.questions.map((question) => {
        if (question.id === this.questionId) {
          if (this.selectedChoiseIndex === 0) {
            question.optionOne.votes.push(this.authedUser);
            this.usersService.addUserAnswer(
              this.authedUser,
              question.id,
              'optionOne'
            );
          } else {
            question.optionTwo.votes.push(this.authedUser);
            this.usersService.addUserAnswer(
              this.authedUser,
              question.id,
              'optionTwo'
            );
          }
        }
        return question;
      });
      this.questionsService.setQuestions(this.questions);
    }
    this.calculateRates(this.question);
    this.snackBar.open('Your Answer Saved Successfully!', 'OK', {
      duration: 3000,
      panelClass: 'green-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    console.log('woooooooooooooooooo3');

    this.isPolled = !this.isPolled;
  }
  calculateRates(question: Question) {
    // console.log(question);
    this.optionOneVotes = question.optionOne.votes.length;
    this.optionTwoVotes = question.optionTwo.votes.length;
    this.totalVotes = this.optionOneVotes + this.optionTwoVotes;
    this.optionOneRate = (this.optionOneVotes / this.totalVotes) * 100;
    this.optionTwoRate = (this.optionTwoVotes / this.totalVotes) * 100;
  }
  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
    this.questionsSub.unsubscribe();
  }
}
