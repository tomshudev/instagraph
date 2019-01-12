/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InstragramService } from './instragram.service';

describe('Service: Instragram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstragramService]
    });
  });

  it('should ...', inject([InstragramService], (service: InstragramService) => {
    expect(service).toBeTruthy();
  }));
});
