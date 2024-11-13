import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanjearPuntosComponent } from './canjear-puntos.component';

describe('CanjearPuntosComponent', () => {
  let component: CanjearPuntosComponent;
  let fixture: ComponentFixture<CanjearPuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanjearPuntosComponent]
    });
    fixture = TestBed.createComponent(CanjearPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
