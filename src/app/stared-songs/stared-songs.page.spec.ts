import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaredSongsPage } from './stared-songs.page';

describe('StaredSongsPage', () => {
  let component: StaredSongsPage;
  let fixture: ComponentFixture<StaredSongsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StaredSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
