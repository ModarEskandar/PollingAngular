import { Question } from './../store/models/question.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, take, takeLast } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor() {
  }
  questionsList = new BehaviorSubject<Question[]>([]);

  setQuestions(questions: Question[]) {
    this.questionsList.next(questions);
  }

  addQuestion(question:Question){
    this.questionsList.pipe(take(1)).subscribe((questions:Question[])=>{
      questions.push(question);
      console.log(questions);
      
      this.questionsList.next(questions);
    });
  }
}
