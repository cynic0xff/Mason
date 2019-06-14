import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Worshipful Master',
      population: 'WM',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://www.picclickimg.com/d/l400/pict/401751435105_/MASONIC-BLUE-LODGE-OFFICER-WORSHIPFUL-MASTER-APRON-And.jpg'
    },
    {
      name: 'Senior Deacon',
      population: 'SD',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];


memberships = new FormControl();
lodgeMemberships: string[] = ['Phoenix Lodge 346', 'Venice Lodge', 'Miami Lodge', 'Cambridge Lodge', 'London Lodge', 'Edinbugh Lodge'];

  data: Profile[] = [];
  isLoading = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getProfiles() {
    this.api.getProfiles()
    .subscribe(res => {
      this.data = res;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    });
  }

}
