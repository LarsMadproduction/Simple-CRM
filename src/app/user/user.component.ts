import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore } from '@angular/fire/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: any[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {}
  ngOnInit(): void {
    let usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, {idField: 'customIdName'}).subscribe((changes: any) => {
      this.allUsers = changes;     
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
