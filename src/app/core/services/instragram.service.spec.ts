/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { InstagramService } from './instragram.service';

describe('Service: Instragram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstagramService]
    });
  });

  it('should ...', inject([InstagramService], (service: InstagramService) => {
    expect(service).toBeTruthy();
  }));
});
