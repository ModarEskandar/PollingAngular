import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { questionReducer } from '../store/reducers/question.reducer';
import { QuestionsEffect } from '../store/effects/questions.effect';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    StoreModule.forFeature('questionslist', questionReducer),
    EffectsModule.forFeature([QuestionsEffect]),
  ],
})
export class QuestionsModule {}
