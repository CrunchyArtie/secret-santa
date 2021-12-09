import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {LimitDateService} from '../../services/limit-date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dateString: string = '';
  private limitDate: Date = new Date();
  public username: string = 'Santa';

  constructor(private limitDateService: LimitDateService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.limitDateService.getUserFriendlyDate().subscribe(dateString => this.dateString = dateString);
    this.limitDateService.getLimitDate().subscribe(limitDate => this.limitDate = limitDate);
    this.username = this.authenticationService.getUsername();
  }

  public isBeforeLimit() {
    return this.limitDate >= new Date();
  }

  public isAfterLimit() {
    return !this.isBeforeLimit()
  }
}
