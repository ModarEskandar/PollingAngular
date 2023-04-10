import { createReducer, on } from '@ngrx/store';
import { IQuestion } from '../models/question.model';
import * as QuestionActions from '../actions/question.action';

export const initialState: IQuestion = {};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.getQuestionsSuccess, (state, { allQuestions }) => {
    return allQuestions;
  })
);
