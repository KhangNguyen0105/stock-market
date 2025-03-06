import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStock2Component } from './create-stock-2.component';

describe('CreateStock2Component', () => {
  let component: CreateStock2Component;
  let fixture: ComponentFixture<CreateStock2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStock2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStock2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
