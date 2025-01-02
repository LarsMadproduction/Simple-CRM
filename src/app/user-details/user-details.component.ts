import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || '';
      this.getUserData();
    });
  }

  getUserData() {
    let userDocRef = doc(this.firestore, 'users', this.userId);
    docData(userDocRef).subscribe(
      (user) => {
        if (user) {
          this.user = new User(user);
        } else {
          console.error('No data found for this user.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
