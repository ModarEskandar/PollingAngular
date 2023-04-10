import { Injectable } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionActions from '../actions/question.action';
import { EMPTY, from, map, mergeMap, withLatestFrom } from 'rxjs';
import { selectQuestions } from '../selectors/questions.selector';

@Injectable()
export class QuestionsEffect {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) {}

  loadAllQuestions = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.getQuestions),
      withLatestFrom(this.store.pipe(select(selectQuestions))),
      mergeMap((questionsFromStore) => {
        if (Object.keys(questionsFromStore).length > 0) return EMPTY;
        return from(this.dataService._getQuestions()).pipe(
          map((data) =>
            QuestionActions.getQuestionsSuccess({ allQuestions: data })
          )
        );
      })
    )
  );
}
