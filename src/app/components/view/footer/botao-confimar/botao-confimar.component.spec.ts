import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfimarComponent } from './botao-confimar.component';

describe('BotaoConfimarComponent', () => {
  let component: BotaoConfimarComponent;
  let fixture: ComponentFixture<BotaoConfimarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoConfimarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoConfimarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
