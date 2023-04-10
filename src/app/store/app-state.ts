import { IUser, User } from '../store/models/user.model';
import { IQuestion } from '../store/models/question.model';

export interface UiState {
  loggedUser: User;
  isLoading: boolean;
}
export interface AppState {
  uiState: UiState;
  storedUsers: IUser;
  storedQuestions: IQuestion;
}
