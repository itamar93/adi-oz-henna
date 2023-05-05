import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from './services/guest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  firstName: string = 'שם פרטי';
  lastName: string = 'שם משפחה';
  userId: string = '0';
  count = 1;
  attend: boolean = false;
  showSubmit = false;
  alreadySubmitted = false;

  constructor(private route: ActivatedRoute, private guestService: GuestService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.queryParams
      .subscribe(async params => {
        this.firstName = params['firstName'];
        this.lastName = params['lastName'];
        this.userId = params['userId'];
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
  }

  submit() {
    this.guestService.submitAttendancy(this.userId, this.firstName, this.lastName, this.attend, this.count);
  }
}
