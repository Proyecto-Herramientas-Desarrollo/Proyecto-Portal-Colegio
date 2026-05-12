import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMini } from './perfil-mini';

describe('PerfilMini', () => {
  let component: PerfilMini;
  let fixture: ComponentFixture<PerfilMini>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilMini],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilMini);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
