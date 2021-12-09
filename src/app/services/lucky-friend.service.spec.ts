import { TestBed } from '@angular/core/testing';

import { LuckyFriendService } from './lucky-friend.service';

describe('LuckyFriendService', () => {
  let service: LuckyFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuckyFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
