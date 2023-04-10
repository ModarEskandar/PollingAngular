import { Question } from './question.model';

export interface State {
  readonly questions: Array<Question>;
}
