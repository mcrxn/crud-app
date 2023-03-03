import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from '../components/reactive-form/reactive-form.component';
import { TemplateDrivenFormsComponent } from '../components/template-driven-forms/template-driven-forms.component';

const appRoutes: Routes = [
  { path: 'template-driven', component: TemplateDrivenFormsComponent },
  { path: 'reactive', component: ReactiveFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
