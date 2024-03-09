import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUnloaderPage } from './create-unloader.page';

describe('CreateUnloaderPage', () => {
  let component: CreateUnloaderPage;
  let fixture: ComponentFixture<CreateUnloaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateUnloaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
