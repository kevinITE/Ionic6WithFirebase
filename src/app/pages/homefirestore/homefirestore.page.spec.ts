import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomefirestorePage } from './homefirestore.page';

describe('HomefirestorePage', () => {
  let component: HomefirestorePage;
  let fixture: ComponentFixture<HomefirestorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomefirestorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomefirestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
