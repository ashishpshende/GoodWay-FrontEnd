import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDealerPage } from './view-dealer.page';

describe('ViewDealerPage', () => {
  let component: ViewDealerPage;
  let fixture: ComponentFixture<ViewDealerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewDealerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
