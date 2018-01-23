import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  
  users: User[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe(
      users => this.users = users,
      err => console.log(err)
    )
  }
}





