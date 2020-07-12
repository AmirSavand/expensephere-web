import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {

  /**
   * Signed out successfully?
   */
  signedOut: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    /**
     * If not logged in, redirect to index
     */
    if (!AuthService.isAuth()) {
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Sign user out
   */
  signOut(): void {
    this.authService.signOut(false);
    this.signedOut = true;
  }
}
