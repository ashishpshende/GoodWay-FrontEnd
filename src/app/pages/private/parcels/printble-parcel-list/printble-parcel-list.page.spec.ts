import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintbleParcelListPage } from './printble-parcel-list.page';

describe('PrintbleParcelListPage', () => {
  let component: PrintbleParcelListPage;
  let fixture: ComponentFixture<PrintbleParcelListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrintbleParcelListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
