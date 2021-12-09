import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {LuckyFriendService} from '../../services/lucky-friend.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public luckyFriend = '';

  constructor(
    private luckyFriendService: LuckyFriendService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.luckyFriendService.getLuckyFriend(this.authenticationService.getUsername()).subscribe((luckyFriend) => this.luckyFriend = luckyFriend)
  }

}
