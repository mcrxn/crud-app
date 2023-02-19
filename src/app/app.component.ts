import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error: string | null = null;

  constructor(public usersService: UsersService) {
    usersService.init();
  }

  saveHandler(form: NgForm) {
    // form.value.creationDate = Date.now();
    this.usersService.saveHandler(form.value as User).subscribe({
      next: () => {
        form.reset({ gender: '' });
        this.error = null;
      },
      error: () => {
        this.error = 'error';
      },
    });
  }
}
