import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbarComponent } from './admin-dashbar.component';

describe('AdminDashbarComponent', () => {
  let component: AdminDashbarComponent;
  let fixture: ComponentFixture<AdminDashbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
