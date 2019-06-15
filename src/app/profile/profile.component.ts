import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface LodgePositions {
  flag: string;
  name: string;
  position: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //TODO: Read lodge positions from mongo
  stateCtrl = new FormControl();
  filteredStates: Observable<LodgePositions[]>;

  lodgePositions: LodgePositions[] = [
    {
      name: 'Worshipful Master',
      position: 'WM',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://www.picclickimg.com/d/l400/pict/401751435105_/MASONIC-BLUE-LODGE-OFFICER-WORSHIPFUL-MASTER-APRON-And.jpg'
    },
    {
      name: 'Senior Deacon',
      position: 'SD',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Junior Decon',
      position: 'JD',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Chaplain',
      position: 'C',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Senior Warden',
      position: 'SW',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Junior Warden',
      position: 'JW',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Senior Steward',
      position: 'SS',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Junior Steward',
      position: 'JS',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Tyler',
      position: 'T',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Secretary',
      position: 'S',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Treasurer',
      position: 'T',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Marshall',
      position: 'M',
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
        map(state => state ? this._filterStates(state) : this.lodgePositions.slice())
      );
  }

  private _filterStates(value: string): LodgePositions[] {
    const filterValue = value.toLowerCase();

    return this.lodgePositions.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
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

  save() {
    console.log('Save...');
  }
}
