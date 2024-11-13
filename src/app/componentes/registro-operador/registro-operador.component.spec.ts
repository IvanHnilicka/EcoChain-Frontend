import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOperadorComponent } from './registro-operador.component';

describe('RegistroOperadorComponent', () => {
  let component: RegistroOperadorComponent;
  let fixture: ComponentFixture<RegistroOperadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroOperadorComponent]
    });
    fixture = TestBed.createComponent(RegistroOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
