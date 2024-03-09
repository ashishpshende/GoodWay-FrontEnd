import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDealerPage } from './create-dealer.page';

describe('CreateDealerPage', () => {
  let component: CreateDealerPage;
  let fixture: ComponentFixture<CreateDealerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateDealerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
