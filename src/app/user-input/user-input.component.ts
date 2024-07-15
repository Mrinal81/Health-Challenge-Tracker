// src/app/user-input/user-input.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number = 0;

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.userService.addWorkout(this.name, this.workoutType, this.minutes);
      this.resetForm();
    }
  }

  resetForm() {
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
