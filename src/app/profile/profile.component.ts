import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface LodgePositions {
  icon: string;
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
      icon: '/assets/images/worshipful_master.png'
    },
    {
      name: 'Senior Deacon',
      position: 'SD',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Junior Decon',
      position: 'JD',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Chaplain',
      position: 'C',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Senior Warden',
      position: 'SW',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Junior Warden',
      position: 'JW',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Senior Steward',
      position: 'SS',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Junior Steward',
      position: 'JS',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Tyler',
      position: 'T',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Secretary',
      position: 'S',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Treasurer',
      position: 'T',
      icon: '/assets/images/senior_deacon.svg'
    },
    {
      name: 'Marshall',
      position: 'M',
      icon: '/assets/images/senior_deacon.svg'
    }
  ];


memberships = new FormControl();

//TODO: Make an array
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
