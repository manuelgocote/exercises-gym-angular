import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../../shared/models/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private readonly baseUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
  }

  getMuscleGroups(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/muscle-groups`);
  }


}
