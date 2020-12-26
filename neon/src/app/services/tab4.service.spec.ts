import { TestBed } from '@angular/core/testing';

import { Tab4Service } from './tab4.service';

describe('Tab4Service', () => {
  let service: Tab4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tab4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
