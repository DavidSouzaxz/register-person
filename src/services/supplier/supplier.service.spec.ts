import { TestBed } from '@angular/core/testing';

import { SupplierFormService } from './supplier.service';

describe('SupplierFormService', () => {
  let service: SupplierFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
