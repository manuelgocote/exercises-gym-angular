import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MuscleGroupService } from '../../../core/services/muscle-group.service';
import { ExerciseService } from '../../../core/services/exercise.service';
import { Exercise } from '../../../shared/models/exercise.model';

@Component({
  selector: 'app-training-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss'],
})
export class TrainingEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private muscleGroupService = inject(MuscleGroupService);
  private exerciseService = inject(ExerciseService);

  date = '';
  form: FormGroup;
  availableMuscleGroups: string[] = [];
  exerciseOptions: Exercise[][] = [];
  exerciseQueries: string[] = [];

  constructor() {
    this.date = this.route.snapshot.paramMap.get('date')!;
    this.form = this.fb.group({
      muscleGroups: [[], Validators.required],
      exercises: this.fb.array([]),
    });
  }

  onMuscleGroupChange(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    const group = select?.value;
    if (!group) return;
    this.addMuscleGroup(group);
    if (select) {
      select.value = '';
    }
  }

  ngOnInit() {
    this.loadMuscleGroups();
    this.loadExistingData();
  }

  get exercises() {
    return this.form.get('exercises') as FormArray;
  }

  loadMuscleGroups() {
    this.muscleGroupService.getAll().subscribe((res) => {
      this.availableMuscleGroups = res.muscleGroups;
    });
  }

  loadExistingData() {
    if (this.date === '2025-06-06') {
      // Simula que llegaron como IDs
      this.form.patchValue({ muscleGroups: ['pecho', 'tríceps'] });

      this.exercises.push(
        this.createExercise('Press banca', [
          { reps: 12, weight: 20 },
          { reps: 10, weight: 22 },
          { reps: 8, weight: 26 },
        ], 'pecho')
      );
      this.exerciseOptions.push([]);

      this.exercises.push(
        this.createExercise('Extensión triceps', [
          { reps: 15, weight: 25 },
          { reps: 12, weight: 35 },
        ], 'tríceps')
      );
      this.exerciseOptions.push([]);
    }
  }

  addMuscleGroup(group: string) {
    if (!group) return;
    const current = this.form.value.muscleGroups as string[];
    if (!current.includes(group)) {
      this.form.patchValue({ muscleGroups: [...current, group] });
    }
  }

  removeMuscleGroup(index: number) {
    const current = this.form.value.muscleGroups as string[];
    current.splice(index, 1);
    this.form.patchValue({ muscleGroups: [...current] });
  }

  createExercise(
    name = '',
    sets: { reps: number; weight: number }[] = [],
    muscleGroup = ''
  ) {
    return this.fb.group({
      muscleGroup: [muscleGroup, Validators.required],
      name: [name, Validators.required],
      sets: this.fb.array(
        sets.map((set) =>
          this.fb.group({
            reps: [set.reps, Validators.required],
            weight: [set.weight, Validators.required],
          })
        )
      ),
    });
  }

  addExercise() {
    this.exercises.push(this.createExercise());
    this.exerciseOptions.push([]);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
    this.exerciseOptions.splice(index, 1);
  }

  getSets(exerciseIndex: number) {
    return this.exercises.at(exerciseIndex).get('sets') as FormArray;
  }

  addSet(exerciseIndex: number) {
    this.getSets(exerciseIndex).push(
      this.fb.group({
        reps: ['', Validators.required],
        weight: ['', Validators.required],
      })
    );
  }

  removeSet(exerciseIndex: number, setIndex: number) {
    this.getSets(exerciseIndex).removeAt(setIndex);
  }

  onExerciseGroupChange(index: number) {
    this.exercises.at(index).patchValue({ name: '' });
    this.exerciseOptions[index] = [];
  }

  onExerciseSearch(index: number, query: string) {
    this.exerciseQueries[index] = query;
    const group = this.exercises.at(index).value.muscleGroup;
    if (!group || !query) {
      this.exerciseOptions[index] = [];
      return;
    }
    this.exerciseService
      .searchByMuscleGroup(group, query)
      .subscribe((res) => (this.exerciseOptions[index] = res));
  }

  selectExercise(index: number, exercise: Exercise) {
    this.exercises.at(index).patchValue({ name: exercise.name });
    this.exerciseOptions[index] = [];
  }

  save() {
    if (this.form.valid) {
      console.log('Datos a guardar:', this.form.value);
      // Enviar a tu backend aquí
    }
  }
}
