import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingrService } from '../training.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingServiec: TrainingrService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingServiec.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.trainingServiec.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingServiec.startExercise(form.value.exercise);
  }
}
