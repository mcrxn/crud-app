import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['reactive-form.component.css'],
})
export class ReactiveFormComponent {
  userForm = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required]),
    creationDate: new FormControl(),
  });

  error: string | null = null;

  constructor(public usersService: UsersService) {
    this.usersService.init();
  }

  get label() {
    return this.userForm.get('label');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  selectedUser(user: User) {
    this.usersService.selectedUser = user;
    this.userForm.setValue({
      label: user.label,
      gender: user.gender,
      creationDate: user.creationDate,
    });
  }

  submit() {
    if (!this.usersService.selectedUser) {
      this.userForm.controls.creationDate.setValue(Date.now());
    }
    this.usersService.saveHandler(this.userForm.value as User).subscribe({
      next: () => {
        this.userForm.reset();
        this.usersService.clearHandler();
      },
      error: () => (this.error = 'error'),
    });
  }

  resetForm(): void {
    this.usersService.clearHandler();
    this.userForm.reset();
  }

  deleteUser(user: User) {
    this.userForm.reset();
    this.usersService.deleteUser(user);
  }
}
