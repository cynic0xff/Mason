import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Phoenix Lodge 346', 'Venice Lodge', 'Miami Lodge', 'Cambridge Lodge', 'London Lodge', 'Edinbugh Lodge'];

  data: Profile[] = [];
  isLoading = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private api: ApiService) { }

  ngOnInit() {
    
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
