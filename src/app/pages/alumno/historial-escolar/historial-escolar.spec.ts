import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEscolar } from './historial-escolar';

describe('HistorialEscolar', () => {
  let component: HistorialEscolar;
  let fixture: ComponentFixture<HistorialEscolar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialEscolar],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialEscolar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
