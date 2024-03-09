import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLoaderPage } from './update-loader.page';

describe('UpdateLoaderPage', () => {
  let component: UpdateLoaderPage;
  let fixture: ComponentFixture<UpdateLoaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
