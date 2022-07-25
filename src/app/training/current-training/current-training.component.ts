import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { TrainingrService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer!: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingrService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startResumeTimer();
  }

  startResumeTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        const step = (ex.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelledExercise(this.progress);
      } else {
        this.startResumeTimer();
      }
    });
  }
}
