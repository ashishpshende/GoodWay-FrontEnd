import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLoaderListPage } from './view-loader-list.page';

describe('ViewLoaderListPage', () => {
  let component: ViewLoaderListPage;
  let fixture: ComponentFixture<ViewLoaderListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewLoaderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
