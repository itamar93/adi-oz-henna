import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  userId: string = '0';
  count = 1;
  attend: boolean = false;
  showSubmit = false;
  alreadySubmitted = false;

  constructor(private route: ActivatedRoute, private guestService: GuestService, private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.queryParams
      .subscribe(async params => {
        this.firstName = params['firstName'];
        this.lastName = params['lastName'];
        this.userId = params['userId'];
        if (!this.userId || !this.firstName || !this.lastName) {
          this.router.navigate(['/page-not-found']);
        }
        if (await this.guestService.isExists(this.userId, this.firstName, this.lastName)) {
          console.log("isExists");
          this.alreadySubmitted = await this.guestService.isAttendEmpty(this.userId);
        }
      }
    );
  }

  add() {
    this.count ++;
  }

  substract() {
    if (this.count > 1) {
      this.count --;
    }
  }

  clickAttend(value: boolean) {
    this.attend = value;
    this.showSubmit = true;
    if (!value) {
      this.count = 0;
    }
    else {
      this.count = 1;
    }
  }

  submit() {
    this.guestService.submitAttendancy(this.userId, this.firstName, this.lastName, this.attend, this.count);
  }
}
