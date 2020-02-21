import { TestBed } from '@angular/core/testing';

import { SrumdataService } from './srumdata.service';


describe('SrumdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SrumdataService = TestBed.get(SrumdataService);
    expect(service).toBeTruthy();
  });
});import { from } from 'rxjs';

