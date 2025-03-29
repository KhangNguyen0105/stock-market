import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDataComponent } from './post-data.component';

describe('PostDataComponent', () => {
  let component: PostDataComponent;
  let fixture: ComponentFixture<PostDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
