// src/app/chart/chart.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../user.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex py-10">
      <div class="w-full bg-[#9747FF]/20 text-white font-semibold rounded-lg">
      <div class='px-10'>
        <h2 class="text-xl text-center pt-2 font-bold mb-4">Users</h2>
        <ul class="text-center">
          <li *ngFor="let user of users"
              (click)="selectUser(user)"
              class="cursor-pointer rounded-lg hover:bg-[#ff9c32]/20 p-2"
              [class.bg-[#ff9c32]]="selectedUser === user">
            {{ user.name }}
          </li>
        </ul>
      </div>
      </div>
      <div class="w-10/12 px-6 py-4">
        <canvas #chart></canvas>
      </div>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('chart') private chartRef!: ElementRef;
  private chart!: Chart;
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.selectUser(users[0]);
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.updateChart();
  }

  private updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.selectedUser) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');

    const chartData: ChartConfiguration<'bar'>['data'] = {
      labels: this.selectedUser.workouts.map(w => w.type),
      datasets: [{
        label: 'Workout Minutes',
        data: this.selectedUser.workouts.map(w => w.minutes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.chart = new Chart(ctx, chartConfig);
  }
}
