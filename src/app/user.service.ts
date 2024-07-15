// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.usersSubject.next(this.users);
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, workoutType: string, minutes: number): void {
    const existingUser = this.users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (existingUser) {
      existingUser.workouts.push({ type: workoutType, minutes });
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name,
        workouts: [{ type: workoutType, minutes }]
      };
      this.users.push(newUser);
    }
    this.saveUsers();
  }
}
