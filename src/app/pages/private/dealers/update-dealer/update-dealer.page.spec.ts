import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDealerPage } from './update-dealer.page';

describe('UpdateDealerPage', () => {
  let component: UpdateDealerPage;
  let fixture: ComponentFixture<UpdateDealerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateDealerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
