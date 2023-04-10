import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { User } from './../../store/models/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { IQuestion, Question } from 'src/app/store/models/question.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private questionsService: QuestionsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  questions$!: Observable<IQuestion>;
  author = '';
  ngOnInit(): void {}
  isSaving = false;
  questions = {};
  onAddQuestion(addQuestionForm: NgForm) {
    if (addQuestionForm.form.invalid) {
      this.snackBar.open(
        'Please make sure that all inputs filled correctly',
        '',
        {
          duration: 3000,
          panelClass: 'red-snackbar',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        }
      );
      return;
    }
    this.isSaving = true;

    addQuestionForm.form.get('optionOne')?.value;
    addQuestionForm.form.get('optionTwo')?.value;

    const userInfo = localStorage.getItem('userInfo') as string;
    const user: User = JSON.parse(userInfo);
    this.author = user.id;
    this.questions = this.dataService
      ._saveQuestion(
        addQuestionForm.form.get('optionOne')?.value,
        addQuestionForm.form.get('optionTwo')?.value,
        this.author
      )
      .then((newQuestion) => {
        this.questionsService.addQuestion(newQuestion);
        this.snackBar.open('Your Question Added Successfully!', '', {
          duration: 3000,
          panelClass: 'green-snackbar',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.isSaving = false;
        this.router.navigate(['home']);
      });
  }
}
