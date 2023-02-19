import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [];
  URL = 'http://localhost:3000';
  selectedUser: User | null = null;
  constructor(private http: HttpClient) {}

  init() {
    this.http.get<User[]>(this.URL + '/users').subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(userToRemove: User) {
    this.http.delete(`${this.URL}/users/${userToRemove.id}`).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== userToRemove.id);
    });
  }

  addUser(user: User) {
    const addUser$ = this.http
      .post<User>(`${this.URL}/users/`, user)
      .pipe(shareReplay(1));

    addUser$.subscribe((newUser) => {
      this.users = [...this.users, newUser];
    });

    return addUser$;
  }

  editUser(user: User) {
    const editUser$ = this.http
      .patch<User>(`${this.URL}/users/${this.selectedUser?.id}`, user)
      .pipe(shareReplay(1));

    editUser$.subscribe((newUser) => {
      this.users = this.users.map((u) => {
        return u.id === this.selectedUser?.id ? newUser : u;
      });
    });

    return editUser$;
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  saveHandler(user: User) {
    if (this.selectedUser) {
      return this.editUser(user);
    } else {
      return this.addUser(user);
    }
  }

  clearHandler() {
    this.selectedUser = null;
  }
}
