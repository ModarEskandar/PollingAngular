import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getQuestions } from 'src/app/store/actions/question.action';
import { selectQuestions } from 'src/app/store/selectors/questions.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}
  questions$ = this.store.pipe(select(selectQuestions));
  ngOnInit(): void {
    this.store.dispatch(getQuestions());
  }
}
