import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { User } from 'src/app/models/user';
import { MessageComponent } from '../dialogs/message/message.component';
import { Message } from 'src/app/models/message';
import { ApiMessagesService } from 'src/app/services/api-messages.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() model: User;
  @Input() isAuthenticated: boolean;
  planet_earth: string;
  messageDialogRef: MatDialogRef<MessageComponent>;
  profile_pic: string;
  cover_pic: string;

  constructor(
    private apiMessages: ApiMessagesService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private n: NotificationService
  ) {
    this.translate.get('planet_earth').subscribe((res: string) => this.planet_earth = res);
  }

  ngOnInit() {
  }

  messageDialog() {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    this.messageDialogRef = this.dialog.open(MessageComponent, {
      hasBackdrop: false,
      width: '70%'
    });
    this.messageDialogRef.afterClosed().subscribe((result: Message) => {
      if (result) {
        result.userMessaged = this.model.username;
        this.apiMessages.send(result).subscribe((test) => {
          this.n.notifyTrans('Message sent');
        });
      }
    });
  }
}
