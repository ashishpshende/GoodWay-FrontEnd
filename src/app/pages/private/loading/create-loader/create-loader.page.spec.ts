import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLoaderPage } from './create-loader.page';

describe('CreateLoaderPage', () => {
  let component: CreateLoaderPage;
  let fixture: ComponentFixture<CreateLoaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
