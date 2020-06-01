import { TestBed } from '@angular/core/testing';

import { CompanyinfoService } from './companyinfo.service';

describe('CompanyinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyinfoService = TestBed.get(CompanyinfoService);
    expect(service).toBeTruthy();
  });
});
