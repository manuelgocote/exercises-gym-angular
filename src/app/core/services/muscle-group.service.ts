// src/app/services/muscle-group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// muscle-group.service.ts
export interface MuscleGroupResponse {
  muscleGroups: string[];
}

@Injectable({ providedIn: 'root' })
export class MuscleGroupService {
  private apiUrl = 'http://localhost:3000/muscle-groups';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MuscleGroupResponse> {
    return this.http.get<MuscleGroupResponse>(this.apiUrl);
  }
}

