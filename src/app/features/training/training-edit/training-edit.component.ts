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

  date = '';
  form: FormGroup;
  availableMuscleGroups: string[] = [];

  constructor() {
    this.date = this.route.snapshot.paramMap.get('date')!;
    this.form = this.fb.group({
      muscleGroups: [[], Validators.required], // Usamos array para select múltiple
      exercises: this.fb.array([]),
    });
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
        ])
      );

      this.exercises.push(
        this.createExercise('Extensión triceps', [
          { reps: 15, weight: 25 },
          { reps: 12, weight: 35 },
        ])
      );
    }
  }

  createExercise(name = '', sets: { reps: number; weight: number }[] = []) {
    return this.fb.group({
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
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
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

  save() {
    if (this.form.valid) {
      console.log('Datos a guardar:', this.form.value);
      // Enviar a tu backend aquí
    }
  }
}
