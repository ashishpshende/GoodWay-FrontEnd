import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUnloaderPage } from './view-unloader.page';

describe('ViewUnloaderPage', () => {
  let component: ViewUnloaderPage;
  let fixture: ComponentFixture<ViewUnloaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewUnloaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
