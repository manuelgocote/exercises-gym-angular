import { Component, inject, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string[];
}

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent {
  private http = inject(HttpClient);

  // Signal para los ejercicios
  private _exercises = signal<Exercise[]>([]);
  exercises = computed(() => this._exercises());

  // Signal para el loading
  loading = signal(true);

  constructor() {
    this.loadExercises();
  }

  private loadExercises() {
    this.loading.set(true);

    this.http.get<Exercise[]>('http://localhost:3000/exercises').subscribe({
      next: (data) => {
        this._exercises.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar ejercicios', err);
        this.loading.set(false);
      }
    });
  }
}
