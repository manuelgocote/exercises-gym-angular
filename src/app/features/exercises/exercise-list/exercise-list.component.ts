import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MuscleGroupService } from '../../../core/services/muscle-group.service';

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
  private muscleGroupService = inject(MuscleGroupService);

  // Signal para los ejercicios
  private _exercises = signal<Exercise[]>([]);
  exercises = computed(() => this._exercises());

  // grupos musculares
  private _muscleGroups = signal<string[]>([]);
  muscleGroups = computed(() => this._muscleGroups());
  selectedMuscle = signal('');

  // Signal para el loading
  loading = signal(true);

  constructor() {
    this.loadMuscleGroups();
    this.loadExercises();
  }

  private loadExercises() {
    this.loading.set(true);

    let url = 'http://localhost:3000/exercises';
    const mg = this.selectedMuscle();
    if (mg) {
      url += `?muscleGroup=${mg}`;
    }

    this.http.get<Exercise[]>(url).subscribe({
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

  private loadMuscleGroups() {
    this.muscleGroupService.getAll().subscribe({
      next: (res) => {
        this._muscleGroups.set(res.muscleGroups);
      },
      error: (err) => console.error(err)
    });
  }

  changeMuscle(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedMuscle.set(value);
    this.loadExercises();
  }
}
