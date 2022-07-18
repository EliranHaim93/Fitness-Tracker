import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingrService {
  exerceseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'squats', name: 'Squats', duration: 120, calories: 20 },
    { id: 'pushups', name: 'Pushups', duration: 60, calories: 8 },
    { id: 'pullups', name: 'Pullups', duration: 60, calories: 10 },
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor() {}

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerceseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'complete',
    });
    this.runningExercise = null;
    this.exerceseChanged.next(null);
  }

  cancelledExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerceseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
