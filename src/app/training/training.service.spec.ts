import { TestBed } from '@angular/core/testing';

import { TrainingrService } from './training.service';

describe('TrainingrService', () => {
  let service: TrainingrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
