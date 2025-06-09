import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Workout {
  muscleGroups: string[];
  exercises: {
    name: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
}

@Component({
  selector: 'app-training-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedDate: string = '';
  workout: Workout | null = null;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.selectedDate = params.get('date') ?? '';
      this.loadWorkout(this.selectedDate);
    });
  }

  loadWorkout(date: string) {
    // Mock temporal
    if (date === '2025-06-06') {
      this.workout = {
        muscleGroups: ['pecho', 'tríceps'],
        exercises: [
          {
            name: 'Press banca',
            sets: [
              { reps: 12, weight: 20 },
              { reps: 10, weight: 22 },
              { reps: 8, weight: 26 }
            ]
          },
          {
            name: 'Extensión triceps',
            sets: [
              { reps: 15, weight: 25 },
              { reps: 12, weight: 35 }
            ]
          }
        ]
      };
    } else {
      this.workout = null;
    }
  }

  editarEntrenamiento() {
    this.router.navigate(['/edit-training', this.selectedDate]);
  }

}
