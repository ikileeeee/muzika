import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecommendationsPage } from './my-recommendations.page';

describe('MyRecommendationsPage', () => {
  let component: MyRecommendationsPage;
  let fixture: ComponentFixture<MyRecommendationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyRecommendationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
