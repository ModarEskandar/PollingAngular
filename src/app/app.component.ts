import { UsersService } from './services/users.service';
import { addQuestion } from './store/actions/question.action';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { LoginComponent } from './login/login.component';
import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { IQuestion, Question } from './store/models/question.model';
import { DataService } from './services/data.service';
import { QuestionsService } from './services/questions.service';
import { IUser, User } from './store/models/user.model';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  isLodingRoute = false;
  title = 'polling';
  constructor(
    private dataService: DataService,
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLodingRoute = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLodingRoute = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  initConditionQ!: Question[];
  initialQuestionsState!: Promise<IQuestion>;
  initConditionU!: User[];
  initialUsersState!: Promise<IUser>;

  questionsSub!: Subscription;
  usersSub!: Subscription;
  authedUserSub!: Subscription;


  ngOnInit() {
    this.questionsSub = this.questionsService.questionsList.subscribe();
    this.usersSub = this.usersService.usersList.subscribe();
      this.initialQuestionsState = this.dataService
        ._getQuestions()
        .then((data) => {
          const questionArray = Object.values(data) as Question[];
          this.questionsService.setQuestions(questionArray);
          return data;
        });
      this.initialUsersState = this.dataService._getUsers().then((data) => {
        const usersArray = Object.values(data) as User[];
        this.usersService.setUsers(usersArray);
        return data;
      });
    
  }
  ngOnDestroy(): void {
    this.questionsSub.unsubscribe();
    this.usersSub.unsubscribe();
    this.authedUserSub.unsubscribe();
    }
}
