import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { InstagramState } from "src/app/core/reducers/instagram.reducer";
import { LoginAction } from "../../../../core/actions/insagram.actions";

@Component({
  selector: "inf-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<InstagramState>) {}

  username: string = "tom7897";
  password: string = "8192426Abc";

  ngOnInit() {}

  login() {
    this.store.dispatch(
      new LoginAction({ username: this.username, password: this.password })
    );
  }
}
