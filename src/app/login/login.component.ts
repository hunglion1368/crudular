import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/authentication/authentication.service';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  selector: 'cru-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = { };
  loading: boolean = false;
  error: string = '';

  /**
   * Creates a new LoginComponent with the injected Router and AuthenticationService.
   * @param {Router}                router                - The injected Router.
   * @param {AuthenticationService} authenticationService - The injected AuthenticationService.
   * @constructor
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  /**
   * Initialises the component and resets the login status.
   */
  ngOnInit() {
    this.authenticationService.logout();
  }

  /**
   * Attempts to login the user with the given credentials of the login form.
   */
  login() {
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }
    );
  }

}
