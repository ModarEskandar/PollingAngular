import { AuthService } from '../services/auth.service';
import { User } from '../store/models/user.model';
import { Observable, Subscription, take } from 'rxjs';
import { IQuestion, Question } from '../store/models/question.model';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit,OnDestroy {
  isUserLogged = false;
  title = 'polling';
  constructor(
    private dataService: DataService,
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private changeRef: ChangeDetectorRef // private store: Store<State>,
  ) {}
  ngOnDestroy(): void {
    this.questionsSub.unsubscribe();
    this.usersSub.unsubscribe();
    this.authedUserSub.unsubscribe();
    }

  //questionsState = new BehaviorSubject<IQuestion>({}); // store the latest questions list
  questionsSub!: Subscription;
  usersSub!: Subscription;
  authedUserSub!: Subscription;

  isAnsweredTab = true;
  isLoading = true;

  questions: Question[] = [];
  users: User[] = [];
  answeredQuestions!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  unansweredQuestions!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  questionsList!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  numOfAnswered = 0;
  numOfUnanswered = 0;
  authedUser = '';
  username = '';
  initialQuestionsState!: Promise<IQuestion>;
  // ngAfterViewChecked(): void {
  //   this.changeRef.detectChanges();
  // }
  ngOnInit() {
    this.authedUserSub = this.authService.loggedUser
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.authedUser = user?.id as string;
        this.username = user?.name as string;
        this.isLoading = false;
      });
      this.usersSub = this.usersService.usersList.subscribe((users:User[])=>{
        this.users = users;
        this.questionsSub = this.questionsService.questionsList.subscribe((questions:Question[])=>{
          this.questionsList = questions
              .sort((q1, q2) => q2.timestamp - q1.timestamp)
              .map((question) => {
                let authorName = '';
                let authorAvatarUrl = '';
                let isAnswered = false;
                for (let user of this.users) {
                  if (user.id === question.author) {
                    authorName = user.name;
                    authorAvatarUrl = user.avatarURL;
                  }
                }
                if (
                  question.optionOne.votes.includes(this.authedUser) ||
                  question.optionTwo.votes.includes(this.authedUser)
                )
                  isAnswered = true;
      
                return { question, isAnswered, authorName, authorAvatarUrl };
              })
          ;
          this.answeredQuestions = this.questionsList.filter((question) => {
            return (
              question.question.optionOne.votes.includes(this.authedUser) ||
              question.question.optionTwo.votes.includes(this.authedUser)
            );
          });
          this.numOfAnswered = this.answeredQuestions.length;
          this.unansweredQuestions = this.questionsList.filter((question) => {
            return (
              !question.question.optionOne.votes.includes(this.authedUser) &&
              !question.question.optionTwo.votes.includes(this.authedUser)
            );
          });
          this.numOfUnanswered = this.unansweredQuestions.length;
        })
      })


    
  }
  onChangeTab() {
    this.isAnsweredTab = !this.isAnsweredTab;
  }
  onViewPoll(questionId: string) {
    this.router.navigate(['question', questionId]);
  }
}
