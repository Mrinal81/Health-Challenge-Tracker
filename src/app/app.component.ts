import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
  <div class="flex justify-center items-center min-h-screen">
  <div class='bg-[#1a1a1a] p-8 rounded-lg shadow-lg'>
  <h1 class="text-3xl font-bold mb-8 text-white text-center">Health Challenge Tracker</h1>
      <nav class="mb-4 flex flex-col sm:flex-row gap-5 justify-center">
        <button class='bg-[#8033FF] p-2 rounded-xl w-full sm:w-auto'>
          <a routerLink="/input" class="block text-white hover:text-gray-200 text-center font-semibold">Add Workout</a>
        </button>
        <button class='bg-[#8033FF] p-2 rounded-xl w-full sm:w-auto'>
          <a routerLink="/list" class="block text-white hover:text-gray-200 text-center font-semibold">View Workouts</a>
        </button>
        <button class='bg-[#8033FF] p-2 rounded-xl w-full sm:w-auto'>
          <a routerLink="/chart" class="block text-white hover:text-gray-200 text-center font-semibold">View Chart</a>
        </button>
      </nav>
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health Challenge Tracker';
}
