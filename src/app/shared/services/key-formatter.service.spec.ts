import { TestBed } from '@angular/core/testing';

import { KeyFormatterService } from './key-formatter.service';

describe('KeyFormatterService', () => {
  let service: KeyFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
