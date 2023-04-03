import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form!: FormGroup;

    constructor(private usersService: UsersService,
                private router: Router)
    { }

  ngOnInit(): void {
  this.form = new FormGroup({
      'email': new FormControl(' ', [Validators.required, Validators.email],
        // @ts-ignore
        this.forbiddenEmails.bind(this)),
      'password': new FormControl(' ', [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(' ', [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
    .subscribe(res => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
            }
          });
        });
}

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
        this.usersService.getUserByEmail(control.value)
          .subscribe((user: User) => {
            if (user) {
              resolve({forbiddenEmail: true});
            } else {
              resolve(null);
            }
          });
    });
  }

}
