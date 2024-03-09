import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUnloaderListPage } from './view-unloader-list.page';

describe('ViewUnloaderListPage', () => {
  let component: ViewUnloaderListPage;
  let fixture: ComponentFixture<ViewUnloaderListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewUnloaderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
