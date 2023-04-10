import { createFeatureSelector } from '@ngrx/store';
import { IQuestion } from '../models/question.model';

export const selectQuestions =
  createFeatureSelector<IQuestion>('questionslist');
