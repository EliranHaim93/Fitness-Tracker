import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingrService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private lodaingSubscription: Subscription;

  constructor(
    private trainingServiec: TrainingrService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.lodaingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.exerciseSubscription = this.trainingServiec.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.lodaingSubscription) {
      this.lodaingSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingServiec.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingServiec.fetchAvailableExercises();
  }
}
