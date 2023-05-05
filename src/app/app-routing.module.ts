import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    children: [
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
