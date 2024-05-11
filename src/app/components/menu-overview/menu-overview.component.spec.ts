import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverviewComponent } from './menu-overview.component';

describe('MenuOverviewComponent', () => {
  let component: MenuOverviewComponent;
  let fixture: ComponentFixture<MenuOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
