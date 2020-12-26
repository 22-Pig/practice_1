import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InteractionPage } from './interaction.page';

describe('InteractionPage', () => {
  let component: InteractionPage;
  let fixture: ComponentFixture<InteractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InteractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
