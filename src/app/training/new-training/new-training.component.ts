import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingrService } from '../training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  // @Output() trainingStart = new EventEmitter<void>();
  exercises: Observable<Exercise[]>;

  constructor(
    private trainingServiec: TrainingrService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exercises = this.db
      .collection('AvailableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Exercise),
            };
          });
        })
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingServiec.startExercise(form.value.exercise);
  }
}
