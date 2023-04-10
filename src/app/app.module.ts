import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PollQuestionComponent } from './question/poll-question/poll-question.component';
import { AuthService } from './services/auth.service';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/app-header.component';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './login/login.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth-guard.service';
import { LeadboardComponent } from './leadboard/leadboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionsComponent,
    LoginComponent,
    AddQuestionComponent,
    PollQuestionComponent,
    AddQuestionComponent,
    LeadboardComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  providers: [DataService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
