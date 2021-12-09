import { Component, OnInit } from '@angular/core';
import { LimitDateService } from 'src/app/services/limit-date.service';

@Component({
  selector: 'app-anonymous-home',
  templateUrl: './anonymous-home.component.html',
  styleUrls: ['./anonymous-home.component.scss']
})
export class AnonymousHomeComponent implements OnInit {
  private limitDate: Date = new Date(); // Valeur par défaut arbitraire
  public dateString: string = '';

  constructor(private limitDateService: LimitDateService) { }

  ngOnInit(): void {
    this.limitDateService.getLimitDate().subscribe((date) => {
      this.limitDate = date;
    })

    this.limitDateService.getUserFriendlyDate().subscribe((dateString) => {
      this.dateString = dateString;
    })
  }

  public isBeforeLimit() {
    return this.limitDate >= new Date();
  }

  public isAfterLimit() {
    return !this.isBeforeLimit()
  }
}
