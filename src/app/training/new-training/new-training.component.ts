import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingrService } from '../training.service';
import { Observable } from 'rxjs';
import { UiService } from '../../ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingServiec: TrainingrService,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
    console.log(this.exercises$);
  }

  onStartTraining(form: NgForm) {
    this.trainingServiec.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingServiec.fetchAvailableExercises();
  }
}
