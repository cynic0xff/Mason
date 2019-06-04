import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  columns: string[] = ['name'];
  data: Profile[] = [];
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProfiles();
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
