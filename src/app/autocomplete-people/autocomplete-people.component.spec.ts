import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePeopleComponent } from './autocomplete-people.component';

describe('AutocompletePeopleComponent', () => {
  let component: AutocompletePeopleComponent;
  let fixture: ComponentFixture<AutocompletePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompletePeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
