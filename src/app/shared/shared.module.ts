import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialSModule } from '../material-s/material-s.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, MaterialSModule],
  exports: [CommonModule, FormsModule, MaterialSModule],
})
export class SharedModule {}
