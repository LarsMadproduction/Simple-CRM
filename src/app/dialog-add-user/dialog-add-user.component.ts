import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerModule,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDatepickerModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user = new User();
  birthDate = new Date();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) {}

  async saveUser() {
    try {
      this.user.birthDate = this.birthDate.getTime();
      console.log('Saving user:', this.user);
      this.loading = true;
      let usersCollection = collection(this.firestore, 'users');
      let result = await addDoc(usersCollection, { ...this.user });
      console.log('User added:', result);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };
}
