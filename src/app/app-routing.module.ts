import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
    { path: '', component: CompaniesComponent },
    { path: 'dashboard', component: CompaniesComponent },
    { path: 'todos', component: TodosComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
