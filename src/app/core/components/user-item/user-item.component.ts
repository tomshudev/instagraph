import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'inf-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.less']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  @Input() showButtons: boolean;

  constructor() {}

  ngOnInit() {}
}
