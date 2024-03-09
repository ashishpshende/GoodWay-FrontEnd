import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUnloaderPage } from './update-unloader.page';

describe('UpdateUnloaderPage', () => {
  let component: UpdateUnloaderPage;
  let fixture: ComponentFixture<UpdateUnloaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateUnloaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
