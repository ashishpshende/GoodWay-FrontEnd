import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLoaderPage } from './view-loader.page';

describe('ViewLoaderPage', () => {
  let component: ViewLoaderPage;
  let fixture: ComponentFixture<ViewLoaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
