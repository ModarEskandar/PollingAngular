import { QuestionsComponent } from './questions/questions.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { AuthGuard } from './services/auth-guard.service';
import { PollQuestionComponent } from './question/poll-question/poll-question.component';
import { LeadboardComponent } from './leadboard/leadboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./questions/questions.module').then((q) => q.QuestionsModule),
  // },
  { path: 'home', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddQuestionComponent, canActivate: [AuthGuard] },
  {
    path: 'question/:id',
    component: PollQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'leadboard',
    component: LeadboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
