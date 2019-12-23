import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SignInWithGoogle } from '../../store/omniflix.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  signInWithGoogle() {
    this.store.dispatch(new SignInWithGoogle());
  }

  ngOnInit() {
  }

}
