import { Component, OnInit} from '@angular/core';

import apartments from './apartments.json';
import { Apartment } from './interfaces';

import houses from './houses.json';
import { House } from './interfaces';

import persons from './persons.json';
import { Person } from './interfaces';


import {AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // initialization variables
  idSelectHouse: number = 0;
  HOUSES: House[] = houses;
  
  
  optionsApart: Apartment[] = [...apartments];
  optionPerson: Person[] = [...persons];

  filteredPerson!: Observable<Person[]>;
  filteredApart!: Observable<Apartment[]>;

  controlApart = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });
  controlPerson = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });

  selectedHouse:Apartment ={
    id: -1,
    hid: -1,
    name:"",
    area:-1
  };
  selectedMan: Person = {
    id: -1,
    aid: -1,
    name: ""
  }

  ngOnInit() {

    // create option array for first autocomplete
    this.optionsApart.forEach(item =>{
      let ind:number = this.optionsApart.indexOf(item);
      this.HOUSES.forEach(element =>{
        if (element.id == this.optionsApart[ind].hid) {this.optionsApart[ind].name = element.name + ", " + this.optionsApart[ind].name;}
      })
    })

    //filtered options
    this.filteredApart = this.controlApart.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.optionsApart.slice())),
    );
    this.filteredPerson = this.controlPerson.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.optionPerson.slice())),
    );

  }

  // filter
  private _filter(name: string): Apartment[] {
    const filterValue = name.toLowerCase();

    return this.optionsApart.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private _filter1(name: string): Person[] {
    const filterValue = name.toLowerCase();

    return this.optionPerson.filter(optionForChild => optionForChild.name.toLowerCase().includes(filterValue));
  }

  // displayFn for visualisation in mat-autocmoplete
  displayFn(Apart: Apartment): string {
    return Apart && Apart.name ? Apart.name : '';
  }
  displayFn1(Apart: Person): string {
    return Apart && Apart.name ? Apart.name : '';
  }

  // change option for first autocomplete
  ChangeApart(){
    this.optionsApart.length = 0;
    this.selectedHouse = {
      id: -1,
      hid: -1,
      name:"",
      area:-1
    }
    this.selectedMan = {
      id: -1,
      aid: -1,
      name: ""
    }
    let NameSelectHouse: string;
    this.HOUSES.forEach(element =>{
      if (element.id == this.idSelectHouse ) {NameSelectHouse = element.name; return}
    })
    apartments.forEach(item => {
      if (item.hid == this.idSelectHouse) this.optionsApart.push(item);
    });
    this.filteredApart = this.controlApart.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.optionsApart.slice())),
    );
  }
  // change option for second autocomplete
  ChangePerson(){
    this.selectedMan = {
      id: -1,
      aid: -1,
      name: ""
    }
    this.optionPerson.length = 0;
    persons.forEach(element=>{
      if ( this.selectedHouse.id == -1 ||element.aid == this.selectedHouse.id) this.optionPerson.push(element);
    })
    this.filteredPerson = this.controlPerson.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.optionPerson.slice())),
    );
  }
}
