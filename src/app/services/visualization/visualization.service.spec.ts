import { TestBed } from '@angular/core/testing';

import { VisualizationService } from './visualization.service';

describe('VehicleService', () => {
  let service: VisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
