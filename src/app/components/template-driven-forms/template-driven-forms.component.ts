import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: 'template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css'],
})
export class TemplateDrivenFormsComponent {
  error: string | null = null;

  constructor(public usersService: UsersService) {
    usersService.init();
  }

  saveHandler(form: NgForm) {
    if (!this.usersService.selectedUser) {
      form.value.creationDate = Date.now();
    }
    this.usersService.saveHandler(form.value as User).subscribe({
      next: () => {
        form.reset({ gender: '' });
        this.usersService.clearHandler();
        this.error = null;
      },
      error: () => {
        this.error = 'error';
      },
    });
  }
}
